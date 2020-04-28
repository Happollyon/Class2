import requests

def main():
    res = requests.get("http://api.fixer.io/latest?base=USD&symbols=EUR")
    if res.status_code != 200:
        raise Exception("erro api request didnt work.")
    data = res.json()
    print(data)
if __name__ == "__main__":
    main()