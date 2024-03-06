def create_seating_order(inputData):
  people = []
  avecs  = []
  groups = []
  
  for row in inputData:
    people.append(row[0].rstrip())
    avecs.append(row[1].rstrip())
    groups.append(row[2].rstrip())

  return {"order": "people"}