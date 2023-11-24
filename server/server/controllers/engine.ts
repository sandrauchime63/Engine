import fs from "fs";
import path from "path";
import { IncomingMessage, ServerResponse } from "http";

type Organizations = {
  organization: string;
  createdAt: Date;
  updatedAt: Date;
  products: string[];
  marketValue: string;
  address: string;
  ceo: string;
  country: string;
  id: number;
  noOfEmployees: number;
  employees: string[];
};

const databaseFolder = path.join(__dirname, "database");
const databaseFile = path.join(databaseFolder, "database.json");

//add data
export const addData = (req: IncomingMessage, res: ServerResponse) => {
  try {
    //declare data structure to store incoming data
    let info = "";

    //fetch data from frontend
    req.on("data", (chunk) => {
      info += chunk; //.toString()
    });

    //after fetching
    req.on("end", async () => {
      let organ: Organizations = JSON.parse(info);

      //create database path automatically
      if (!fs.existsSync(databaseFolder)) {
        fs.mkdirSync(databaseFolder);
      }
      if (!fs.existsSync(databaseFile)) {
        fs.writeFileSync(databaseFile, "[]");
      }

      //if database path exists read from database

      const databaseRead = fs.readFileSync(databaseFile, "utf-8");
      const databaseParse: Organizations[] = JSON.parse(databaseRead);

      //incoperate the date
      organ['createdAt'] = new Date();
      organ.updatedAt = new Date();

      //id structuring
      if (databaseParse.length === 0) {
        organ.id = 1;
      } else {
        organ.id = databaseParse.length + 1;
      }

      //checking if data exists

      // let name = organ.organization
      // for(let i = 0; i<databaseParse.length; i++){

      // }

      //add to the databse
      databaseParse.push(organ); //problem

      fs.writeFileSync(databaseFile, JSON.stringify(databaseParse), "utf-8");

      //writeHead specifies what the data would look like
      //content-type specifies the type of what is being sent out which is application/json
      res.writeHead(200, { "content-Type": "application/json" });
      res.end(JSON.stringify({ data: organ }));
    });
  } catch (err: any) {
    console.log(err.message);
  }
};
//Get all data from the database
export const getAllData = (req: IncomingMessage, res: ServerResponse) => {
  try {
    const databaseContent = fs.readFileSync(databaseFile, "utf-8");
    if (databaseContent) {
      const parsedData = JSON.parse(databaseContent);
      res.writeHead(200, { "content-Type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Successfully gotten data",
          data: parsedData,
        })
      );
    } else {
      res.writeHead(401, { "content-Type": "application/json" });
      res.end(
        JSON.stringify({
          message: "operation unsuccessful",
        })
      );
    }
  } catch (err: any) {
    console.log(err.message);
  }
};
export const updateData = (req: IncomingMessage, res: ServerResponse) => {
  try {
    //declare data structure to store incoming data
    let info = "";

    //fetch data
    req.on("data", (chunk) => {
      info += chunk.toString(); //.toString()
    });

    //after fetching
    req.on("end", async () => {
      let organ: Organizations = JSON.parse(info);

      const databaseRead = fs.readFileSync(databaseFile, "utf-8"); //READING FILE FROM THE DATABASE
      const databaseParse = JSON.parse(databaseRead); //PARSED DATABASE

      for (let i = 0; i < databaseParse.length; i++) {
        if (organ.organization === databaseParse[i].organization) {
            databaseParse[i].updatedAt=new Date()
            organ.id = databaseParse[i].id
            databaseParse[i] = organ;
        }
      }
      fs.writeFileSync(databaseFile, JSON.stringify(databaseParse), "utf-8");
      res.writeHead(200, { "content-Type": "application/Json" });
      res.end(JSON.stringify({ data: organ }));
    });
  } catch (err: any) {
    console.log(err.message);
  }
};

export const deleteData = (req: IncomingMessage, res: ServerResponse) => {
  try {
    //declare data structure to store incoming data
    let info = "";

    //fetch data
    req.on("data", (chunk) => {
      info += chunk.toString(); //.toString()
    });

    //after fetching
    req.on("end", async () => {
      let organ: Organizations = JSON.parse(info);

      const databaseRead = fs.readFileSync(databaseFile, "utf-8"); //READING FILE FROM THE DATABASE
      const databaseParse = JSON.parse(databaseRead); //PARSED DATABASE

      //to delete
      for (let i = 0; i < databaseParse.length; i++) {
        if (organ.organization === databaseParse[i].organization) {
          databaseParse.splice(i, 1);
        }
      }
      //to move the id's to the right places
      for (let i = 0; i < databaseParse.length; i++) {
        databaseParse[i].id = i+1
      }
      
      fs.writeFileSync(databaseFile, JSON.stringify(databaseParse), "utf-8");
      res.writeHead(200, { "content-Type": "application/Json" });
      res.end(JSON.stringify({ data: organ }));
    });
  } catch (err: any) {
    console.log(err.message);
  }
};


interface Sandra {
  name: string;
  age: string;
  nationality: string;
  phone_number: number;
}

let lady:Sandra = {
  name: "Sandra",
  age: "45",
  nationality: "Jamaican",
  phone_number: 90
}

let ladyArr: Sandra[] = [
  {
    name: "Sandra",
    age: "45",
    nationality: "Jamaican",
    phone_number: 90
  }
]