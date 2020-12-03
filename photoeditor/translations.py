import os


def translation(lang):
    files=lang+".txt"
    actualDir=os.getcwd().replace("\\","/")
    with open(actualDir+"/photoeditor/static/assets/translations/"+lang+".json","r",encoding='utf8') as f:
        data= f.read()
        f.close()
    return data

