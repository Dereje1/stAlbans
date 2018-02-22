import os
import csv
import json

def read_csv(File_name):
    #This is a convinient function to rewrite csv files, it is used both by csv_pop and filter_csv
    Modified_CSV_File = os.path.join(os.getcwd(),File_name)
    output = []
    e = 0
    if os.path.isfile(Modified_CSV_File):
        with open(Modified_CSV_File, 'rb') as f:
            reader = csv.reader(f)
            for e,row in enumerate(reader):
                output.append(row)
        #if (e==0):
            #os.remove(Modified_CSV_File)
    return output

x = read_csv("../sensitive/data2.csv")

groupdescriptions=["TADPOLES - Group 1A - Room 8 (8/2)","TADPOLES - Group 1B - Room 8 (8/2)","TADPOLES - Group 2A - Room 8 (8/2)","TADPOLES - Group 2B - Room 8 (8/2)","FROGS - Group 1A - Room 6 (8/2)","FROGS - Group 1B - Room 6 (8/2)","FROGS/CATERPILLARS - Group 1A - Room 6 (8/2)","FROGS/CATERPILLARS - Group 1B - Room 6 (8/2)","CATERPILLARS - Group 1A - Room 4 (8/2)","CATERPILLARS - Group 1B - Room 4 (8/2)","BUTTERFLIES - Group 1A - Room 3 (12/3)","BUTTERFLIES - Group 1A - Room 3 (12/3)","BUTTERFLIES - Group 2A - Room 3 (12/3)","BUTTERFLIES - Group 2B - Room 4 (12/3)","BUNNIES - Group 1 - Room 1 (16/2)","BUNNIES - Group 2 - Room 1 (16/2)","ELEPHANTS - Group 1 - Room 9 (12/2)","ELEPHANTS - Group 2 - Room 10 (8/1)","EAGLES - Group 1 - Room 11 (20/2)"]



y = x[3:] # just get to the student data

collector=[]
for (e,srow) in enumerate(y):
    groupcount=0
    for c,months in enumerate(x[2]):
        if(months=="February"):
            groupcount+=1
            #print(e+4,c+1)
            #print("group " + str(groupcount) + "-" + srow[c])

            collector.append([groupcount,srow[c],groupdescriptions[groupcount-1]])

compiledData = []
for g in range(19):
    #print ("Group " + str(g+1))
    for students in collector:
        if((g+1)==students[0]):
            studentdata = students[1].split("\r\n")
            if(len(studentdata)>1):
                name = studentdata[0].strip()
                dob=studentdata[1].strip()
                animal = students[2].split("-")[0].strip()
                groupNo = students[2].split("-")[1].strip()
                room = students[2].split("-")[2].strip()
                compiledData.append([name,dob,animal,groupNo,room])

allAnimals  = [x[2] for x in compiledData]
allGroups  = [x[3] for x in compiledData]
uniqueAnimals = set(allAnimals)
uniqueGroups = set(allGroups)

builddata = {}

def groupExpand(group,data):
    groupEntities = {}
    groupEntities[group]={}
    groupEntities[group]["room"]=data[4]
    groupEntities[group]["students"]=[]
    return groupEntities
def groupcheck(arr,check):
    allkeys = []
    for l in arr:
        allkeys.append(l.keys())
    flat_list = [item for sublist in allkeys for item in sublist]
    if (flat_list.count(check)==0):
        return True
    else:
        return False

for animal in uniqueAnimals:
    groupHolder=[]
    for group in uniqueGroups:
        for data in compiledData:
            if (data[2]==animal and data[3]==group):
                if(groupcheck(groupHolder,group)):
                    groupHolder.append(groupExpand(group,data))
                    builddata[animal] = groupHolder
def findstudents(animal,group):
    students = []
    for data in compiledData:
        if (data[2]==animal and data[3]==group):
            studentobject={}
            studentobject[data[0]]={}
            studentobject[data[0]]["dob"]=data[1]
            studentobject[data[0]]["Parent1"]=".."
            students.append(studentobject)
    return students

def compilestudents():
    for animal in builddata:
        for group in builddata[animal]:
            for groupItems in group:
                group[groupItems]['students'] = (findstudents(animal,groupItems))

compilestudents()
json_data = json.dumps(builddata)

print(json_data)
