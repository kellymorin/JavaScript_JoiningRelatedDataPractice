
import DOMComponent from "../lib/node_modules/nss-domcomponent"


class Article extends DOMComponent{
  constructor(attributes, ...children){
    super("article", attributes, ...children)
  }
}

const hogwartsEmployees = {
  getEmployees: ()=>{
    return fetch("http://localhost:8088/employees?_expand=department&_expand=computer")
    .then((data)=> data.json())
  },

  makeEmployee: (employees)=>{
    employees.forEach((employee)=>{
      let employeeData = {
        name: employee.name,
        department: employee.department.name,
        computer: employee.computer.name
      }
      hogwartsEmployees.makeEmployeeDisplay(employeeData)
    })
  },

  makeEmployeeDisplay: (attribute)=>{
    const employee = new Article({},
      new DOMComponent("header",{className: "employee__name"},
        new DOMComponent("h1", {textContent: attribute.name})
      ),
      new DOMComponent("section", {className: "employee__department", textContent: `Works in ${attribute.department} department`}),
      new DOMComponent("section", {className: "employee__computer", textContent: `Currently using a ${attribute.computer}`})
    ).render("#employee__cards")
  }
}

hogwartsEmployees.getEmployees().then((data)=> hogwartsEmployees.makeEmployee(data))
