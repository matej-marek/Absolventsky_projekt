from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.template import loader
from django.conf import settings
from django.core.files.storage import FileSystemStorage
from django.views.decorators.csrf import csrf_protect

from django.views.decorators.csrf import ensure_csrf_cookie


from PIL import Image, ImageFont,ImageDraw, ImageEnhance



# Create your views here.
def index(request):
    return render(request, 'index.html')

#actions

@ensure_csrf_cookie
def histogram(request):
    if request.method=="POST":
        import json
        import base64
        from io import BytesIO
        datapuvodni = request.POST.get('img')
        #start of decode
        data = datapuvodni[datapuvodni.find(",")+1:]
        typ = datapuvodni[:datapuvodni.find(",")+1]
        typ = typ[:typ.find(";")]
        typ = typ[typ.find("/")+1:]
        byteImgIO = BytesIO(base64.b64decode(data))
        byteImgIO.seek(0)
        byteImg = byteImgIO.read()
        dataBytesIO = BytesIO(byteImg)
        im= Image.open(dataBytesIO)
        # end of decode
        width, height= im.size
        number=width*height
        total=0
        ims=im.load()
        histoy=[]
        histor=[]
        histob=[]
        histog=[]
        
        for x in range(256):
            histoy.insert(x,0)
            histor.insert(x,0)
            histog.insert(x,0)
            histob.insert(x,0)
        if typ=="png":
            for y in range(height):
                for x in range(width):
                    r,g,b,a = ims[x,y]
                    y=round(0.299*r+0.587*g+0.114*b)
                    histoy[y]=histoy[y]+1
                    histor[r]=histor[r]+1
                    histog[g]=histog[g]+1
                    histob[b]=histob[b]+1
        else:
            for y in range(height):
                for x in range(width):
                    r,g,b = ims[x,y]
                    y=round(0.299*r+0.587*g+0.114*b)
                    histoy[y]=histoy[y]+1
                    histor[r]=histor[r]+1
                    histog[g]=histog[g]+1
                    histob[b]=histob[b]+1

        printout= {
            'y':{'data':histoy},
            'r':{'data':histor},
            'g':{'data':histog},
            'b':{'data':histob},
        }
        return HttpResponse(json.dumps(printout))


def basiccoloredit(request):
    if request.method=="POST":
        import json
        import base64
        from io import BytesIO
        datapuvodni = request.POST.get('img')
        brightness = float(request.POST.get('brightness'))
        contrast = float(request.POST.get('contrast'))
        rotation = int(request.POST.get('rotation'))
        #start of decode
        data = datapuvodni[datapuvodni.find(",")+1:]
        typ = datapuvodni[:datapuvodni.find(",")+1]
        typ = typ[:typ.find(";")]
        typ = typ[typ.find("/")+1:]
        byteImgIO = BytesIO(base64.b64decode(data))
        byteImgIO.seek(0)
        byteImg = byteImgIO.read()
        dataBytesIO = BytesIO(byteImg)
        im= Image.open(dataBytesIO)
        #rotate
        im=im.rotate(rotation)
        # end of decode
        #brighness
        enhancer = ImageEnhance.Brightness(im)
        brightimg = enhancer.enhance(brightness)
        #contrast
        enhancer = ImageEnhance.Contrast(brightimg)
        output = enhancer.enhance(contrast)
        #output
        buffer = BytesIO()
        output.save(buffer,format=typ)                  
        myimage = buffer.getvalue()            
        data=str(base64.b64encode(myimage))  
        data = data[data.find("'")+1:]      
        imgdataedited ="data:image/"+str(typ)+";base64,"+data
        printout= {
            'img':imgdataedited
        }
        return HttpResponse(json.dumps(printout))

def photoeditor(request,lang):
    import os,sys,inspect
    from . import translations
    import json

    langs=["cs","en"]
    if lang in langs:
        langs.remove(lang)
        currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
        parentdir = os.path.dirname(currentdir)
        sys.path.insert(0,parentdir) 

        import commit
        commit=commit.commit("main")
        commitZkraceny=commit[:7]
        # přidání překladů do contextů
        preklad=json.loads(translations.translation(lang))
        context={"commit":commit,"commitZkraceny":commitZkraceny,"verze":"0.6.2", "datum_vydani":"19.12.2020", "lang":lang,"langs":langs}
        context.update(preklad)
        return render(request, 'editor.html',context)
    else:
        return render(request, 'documention.html')
        return redirect(photoeditor, lang="cs")

def documention(request):
    return render(request, 'documention.html')

def obrazek(request):
    return render(request, 'mouse.html')









