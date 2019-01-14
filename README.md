# Joining Data in Separate Objects Practice: Small Business

A small business wants to keep track of its employees and the computers that they use. Each employee is assigned to a department, and they each get assigned a computer when they join the company.

1. Build arrays of objects that represent _Employees_, _Departments_, and _Computers_.
1. Assign every resource a unique `id` property.
1. Assign each employee to a department using a foreign key.
1. Assign each employee a computer using a foreign key.

Once your data is normalized, use your DOM skills to display a card for each employee. It should display the employee name, the name of their department, and which computer they are using

```html
<article class="employee">
    <header class="employee__name">
        <h1>Rainu Ittycheriah</h1>
    </header>
    <section class="employee__department">
        Works in the IT department
    </section>
    <section class="employee__computer">
        Currently using a 2015 MacBook Pro
    </section>
</article>
```
