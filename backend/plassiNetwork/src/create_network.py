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
        if i in G.nodes and j in G.nodes:
            G.add_edge(i,j,weight=10.0)

def add_groups(people: list, groups: list):
    for i in range(len(people)):
        for group1 in groups[i]:
            if group1 in G.nodes():
                G.add_edge(people[i], group1, weight=1)
            else:
                for j in range(len(people)):
                    if i != j and groups[i] != "" and groups[j] != "":
                                for group2 in groups[j]:
                                    if group1.strip() == group2.strip():
                                        if (G.has_edge(people[i],
                                                    people[j])):
                                            G[people[i]][people[j]]["weight"] += 1.0/(groups[i].index(group1.strip())+1.0)
                                        else:
                                            G.add_edge(people[i],
                                                    people[j], weight=1.0/(groups[i].index(group1.strip())+1.0))
