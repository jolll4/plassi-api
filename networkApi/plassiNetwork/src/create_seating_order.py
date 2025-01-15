from .create_network import create_network 

import networkx as nx
import matplotlib.pyplot as plt
import io
import random

def create_seating_order(inputData):
  people = []
  avecs  = []
  groups = []

  cleanedInputData = inputData.decode().replace("[[", "").replace("]]", "").split("],[")
  data = []
  for row in cleanedInputData:
    data.append(row.replace('"', "").split(","))

  for row in data:
    people.append(row[0].rstrip())
    avecs.append([row[0].rstrip(), row[1].rstrip()])
    groups.append(row[2].rstrip().split(";"))

  avecs = cleanAvecs(avecs)

  testOrder = []

  for person in people:
    if testOrder == [] or len(testOrder[len(testOrder) - 1]) > 1:
      testOrder.append([person])
    else:
      testOrder[len(testOrder) - 1].append(person)

  network = create_network(people, avecs, groups)

  # draw_network(network)

  return seatGroups(network)

def cleanAvecs(avecs: list):
  empties = []
  for pair in avecs:
    if not pair[1] or pair[1] == "":
      empties.append(pair)

  for i in empties:
    avecs.pop(avecs.index(i))

  return avecs

def seatGroups(network):
  seatings = []
  for group in nx.connected_components(network):
    seatings = seatPeople(network.subgraph(group), seatings)
  
  return seatings

def seatPeople(subgraph, seatings: list):
  cliques = nx.find_cliques(subgraph)

  for clique in cliques:
    remaining = []
    color = random_color()
    for node in clique:
      found = False
      for pair in seatings:
        for person in pair:
          if person[0] == node:
            found = True
            person[1].append(color)

      if not found and node not in remaining:
        remaining.append(node)

    seatings = seat(remaining, seatings, color)

  return seatings

def seat(people: list, seatings: list, color):
    for person in people:
      person_color = [person, [color]]
      if seatings == [] or len(seatings[len(seatings) - 1]) > 1:
        seatings.append([person_color])
      else:
        seatings[len(seatings) - 1].append(person_color)

    return seatings

def draw_network(G):
    pos = nx.spring_layout(G, seed=0)
    nx.draw_networkx_nodes(G, pos, node_size=10)
    nx.draw_networkx_edges(G, pos, width=0.1)
    nx.draw_networkx_labels(G, pos)
    plt.show()
    plt.close()

def random_color():
    return "#"+''.join([random.choice('0123456789ABCDEF') for j in range(6)])