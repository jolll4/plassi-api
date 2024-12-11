from .create_network import create_network 

import networkx as nx
import matplotlib.pyplot as plt

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
  largest_clique = nx.approximation.max_clique(subgraph)
  cliques = nx.find_cliques(subgraph)
  
  seatings = seat(list(largest_clique), seatings)

  remaining = []
  for clique in cliques:
    for node in clique:
      found = [ pair for pair in seatings if node in pair]

      if len(found) == 0 and node not in remaining:
        remaining.append(node)

  seatings = seat(remaining, seatings)

  return seatings

def seat(people: list, seatings: list):
    for person in people:
      if seatings == [] or len(seatings[len(seatings) - 1]) > 1:
        seatings.append([person])
      else:
        seatings[len(seatings) - 1].append(person)

    return seatings

def draw_network(G):
    pos = nx.spring_layout(G, seed=0)
    nx.draw_networkx_nodes(G, pos, node_size=10)
    nx.draw_networkx_edges(G, pos, width=0.1)
    plt.show()