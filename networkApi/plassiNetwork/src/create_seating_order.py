from .create_network import create_network 

import networkx as nx
import matplotlib.pyplot as plt
import random
import json

def create_seating_order(inputData):
  people = []
  avecs  = []
  groups = []

  data = json.loads(inputData)

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
  global color_seed
  color_seed = random.randrange(4)
  seatings = []
  for group in nx.connected_components(network):
    seatings = seatPeople(network.subgraph(group), seatings)
  
  return seatings

def seatPeople(subgraph, seatings: list):
  cliques = list(nx.find_cliques(subgraph))

  degree_centrality = nx.degree_centrality(subgraph)
  lowest_centralities = {key:val for key,val in degree_centrality.items() if val == min(degree_centrality.values())}
  lowest_centrality_node = list(lowest_centralities.keys())[0]

  for i in range(len(cliques)):
    if lowest_centrality_node in cliques[i]:
      seat_clique(cliques[i], seatings)
      cliques.pop(i)
      break

  for clique in cliques:
    seatings = seat_clique(clique, seatings)

  return seatings

def seat_clique(clique, seatings):
  remaining = []
  color = color_and_shape()
  # cliqueGraph = subgraph.subgraph(clique)
  # draw_network(cliqueGraph)
  # print(clique)
  for node in clique:
    found = False
    for pair in seatings:
      for person in pair:
        if person[0] == node:
          found = True
          person[1].append(color)

    if not found and node not in remaining:
      remaining.append(node)

  return seat(remaining, seatings, color)

# def order_based_on_overlap(groups: list):
#   for i in groups:
#     for j in list(groups):
#       print(calculate_overlap(i, j))
  
#   return groups

# def calculate_overlap(group1: list, group2: list):
#   overlap_count = 0.0
#   for i in group1:
#     if i in group2:
#       overlap_count +=1
  
#   return overlap_count/len(group1) if overlap_count >= 0.0 else 0.0

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

def color_and_shape():
  global color_seed

  shade = '89abcde'[color_seed % 7]
  color = ['0', '0', '0']

  if color_seed % 6 < 3:
    color[color_seed % 3] = shade
  else:
    color = [shade, shade, shade]
    color[color_seed % 3] = '0'
  
  shape =  [ "circle", "square", "triangle", "triangle-down", "minus"][color_seed % 5]
  color_seed += 1

  return ["#"+''.join(color), shape]