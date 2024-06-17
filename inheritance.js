import React from "react"

class Animal extends React.Component{
    constructor(name){
        this.name=name
    }
    speak(){
        console.log(`${this.name} speaks`);
    }
}
 class Dog extends Animal{
    constructor(name){
        super(name)
    }

 }

const D=new Dog('Rocky');
D.speak();