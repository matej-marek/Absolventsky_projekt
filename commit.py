# Python program to get parent 
# directory 

def commit(filecommit):
    import os 
    # get current directory 
    path = os.getcwd() 
    print("Current Directory:", path) 
    # prints parent directory 
    parent = os.path.abspath(os.path.join(os.path.join(path, os.pardir),os.pardir))
    soubor = os.path.abspath(os.path.join("", ".git/refs/heads/"+filecommit)).replace('\\','/')
    with open(soubor,"r") as f:
        data =f.read()
        f.close()
    return data
