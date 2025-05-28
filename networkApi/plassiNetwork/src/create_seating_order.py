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
  
  headers = data[0]
  firstNameIndex = headers.index("Etunimi")
  lastNameIndex = headers.index("Sukunimi")
  avecNameIndex = headers.index("Avec")
  placementNameIndex = headers.index("Pöytäseurue")

  for row in data:
    if row[firstNameIndex].rstrip() != "Etunimi":
      people.append(row[firstNameIndex].rstrip() + " " + row[lastNameIndex].rstrip())
      avecs.append([row[firstNameIndex].rstrip() + " " + row[lastNameIndex].rstrip(), row[avecNameIndex].rstrip()])
      groups.append(row[placementNameIndex].rstrip().split(","))

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
      seatings, previous_node = seat_clique(subgraph, cliques[i], seatings, None)
      cliques.pop(i)
      break
  
  while len(cliques) > 0:
    added = False
    for i in range(len(cliques)):
      if previous_node in cliques[i]:
        seatings, previous_node = seat_clique(subgraph, cliques[i], seatings, previous_node)
        cliques.pop(i)
        added = True
        break
    if not added:
      seatings, previous_node = seat_clique(subgraph, cliques[0], seatings, previous_node)
      cliques.pop(0)

  return seatings

def seat_clique(G, clique, seatings, previous_node):
  remaining = []
  color = color_and_shape()
  node = previous_node

  while len(clique) > 0:
    if len(clique) > 1:
      node = find_lowest_degree_closest_neighbor(G, node, clique)
    else:
      node = clique[0]
    clique.pop(clique.index(node))

    found = False
    for pair in seatings:
      for person in pair:
        if person[0] == node:
          found = True
          person[1].append(color)

    if not found and node not in remaining:
      remaining.append(node)

  return seat(remaining, seatings, color), node

def find_lowest_degree_closest_neighbor(G, node, clique):
  highest_weight = 0
  highest_weight_edges = []

  if node:
    for i in clique:
      if G.has_edge(node, i):
        if G.edges[(node, i)]["weight"] > highest_weight:
          highest_weight_edges = [i]
          highest_weight = G.edges[(node, i)]["weight"]
        elif G.edges[(node, i)]["weight"] == highest_weight:
          highest_weight_edges.append(i)

  if len(highest_weight_edges) == 0:
    highest_weight_edges = clique

  if len(highest_weight_edges) == 1:
    return highest_weight_edges[0]

  lowest_degree_node = highest_weight_edges[0]
  lowest_degree = G.degree(lowest_degree_node)

  for i in highest_weight_edges:
    if lowest_degree > G.degree(i):
      lowest_degree_node = i

  return lowest_degree_node

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