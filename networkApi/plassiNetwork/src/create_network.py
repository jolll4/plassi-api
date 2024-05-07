import networkx as nx

def create_network(people: list, avecs: list, groups: list):
    global G
    G = nx.Graph()
    create_edgeless_network(people)
    add_avecs(avecs)
    add_groups(people, groups)
    return G

def create_edgeless_network(people):
    for i in people:
        G.add_node(i)

def add_avecs(avecs):
    for i, j in avecs:
        G.add_edge(i,j,weight=10.0)

def add_groups(people: list, groups: list):
    for i in range(len(people)):
        for j in range(len(people)):
            if i != j and groups[i] != "" and groups[j] != "":
                for group1 in groups[i]:
                    for group2 in groups[j]:
                        if group1.rstrip() == group2.rstrip():
                            if (G.has_edge(people[i],
                                        people[j])):
                                G[people[i]][people[j]]["weight"] += 1.0/(groups[i].index(group1.rstrip())+1.0)
                            else:
                                G.add_edge(people[i],
                                        people[j], weight=1.0/(groups[i].index(group1.rstrip())+1.0))
