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
    avecs.append(row[1].rstrip())
    groups.append(row[2].rstrip())

  testOrder = []

  for person in people:
    if testOrder == [] or len(testOrder[len(testOrder) - 1]) > 1:
      testOrder.append([person])
    else:
      testOrder[len(testOrder) - 1].append(person)

  order = testOrder

  return order