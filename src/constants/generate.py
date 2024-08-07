with open("nasdaq.csv", "r") as f:
    res = []

    lines = f.readlines()
    for line in lines:
        line = line.strip(" \n").split(",")
        res.append({"symbol": line[0], "name": line[1]})

with open("stocks.ts", "w") as f:
    f.write("export const NASDAQ = " + str(res) + ";")
