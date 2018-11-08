(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

const elementSymbol = Symbol();

class DOMComponent {
  constructor(type, attributes, ...children) {
    this[elementSymbol] = document.createElement(type);
    /*
        If `attributes` is just a string, it's a simple element with no
        properties - just some text content
    */

    if (typeof attributes === "string") {
      this[elementSymbol].textContent = attributes;
      return this;
    } else if (typeof attributes === "object") {
      this[elementSymbol] = Object.assign(this[elementSymbol], attributes);
    }

    if (children.length) {
      children.forEach(child => {
        // One HTMLElement was passed in
        if (child.element instanceof window.Element) {
          this[elementSymbol].appendChild(child.element); // An array of elements was passed in
        } else if (Array.isArray(child.element)) {
          child.element.forEach(c => this[elementSymbol].appendChild(c)); // String value was passed in, set text content
        } else {
          this[elementSymbol].textContent = child;
        }
      });
    }

    return this;
  }

  get element() {
    return this[elementSymbol];
  }

  render(container) {
    const fragment = document.createDocumentFragment();
    fragment.appendChild(this[elementSymbol]);
    document.querySelector(container).appendChild(fragment);
  }

}

module.exports = DOMComponent;

},{}],2:[function(require,module,exports){
"use strict";

var _nssDomcomponent = _interopRequireDefault(require("../lib/node_modules/nss-domcomponent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Article extends _nssDomcomponent.default {
  constructor(attributes, ...children) {
    super("article", attributes, ...children);
  }

}

const hogwartsEmployees = {
  getEmployees: () => {
    return fetch("http://localhost:8088/employees?_expand=department&_expand=computer").then(data => data.json());
  },
  makeEmployee: employees => {
    employees.forEach(employee => {
      let employeeData = {
        name: employee.name,
        department: employee.department.name,
        computer: employee.computer.name
      };
      hogwartsEmployees.makeEmployeeDisplay(employeeData);
    });
  },
  makeEmployeeDisplay: attribute => {
    const employee = new Article({}, new _nssDomcomponent.default("header", {
      className: "employee__name"
    }, new _nssDomcomponent.default("h1", {
      textContent: attribute.name
    })), new _nssDomcomponent.default("section", {
      className: "employee__department",
      textContent: `Works in ${attribute.department} department`
    }), new _nssDomcomponent.default("section", {
      className: "employee__computer",
      textContent: `Currently using a ${attribute.computer}`
    })).render("#employee__cards");
  }
};
hogwartsEmployees.getEmployees().then(data => hogwartsEmployees.makeEmployee(data));

},{"../lib/node_modules/nss-domcomponent":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvbnNzLWRvbWNvbXBvbmVudC9pbmRleC5qcyIsIi4uL3NjcmlwdHMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOztBQUVBLE1BQU0sYUFBYSxHQUFHLE1BQU0sRUFBNUI7O0FBRUEsTUFBTSxZQUFOLENBQW1CO0FBQ2YsRUFBQSxXQUFXLENBQUMsSUFBRCxFQUFPLFVBQVAsRUFBbUIsR0FBRyxRQUF0QixFQUFnQztBQUN2QyxTQUFLLGFBQUwsSUFBc0IsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBdEI7QUFFQTs7Ozs7QUFJQSxRQUFJLE9BQU8sVUFBUCxLQUFzQixRQUExQixFQUFvQztBQUNoQyxXQUFLLGFBQUwsRUFBb0IsV0FBcEIsR0FBa0MsVUFBbEM7QUFDQSxhQUFPLElBQVA7QUFDSCxLQUhELE1BR08sSUFBSSxPQUFPLFVBQVAsS0FBc0IsUUFBMUIsRUFBb0M7QUFDdkMsV0FBSyxhQUFMLElBQXNCLE1BQU0sQ0FBQyxNQUFQLENBQWMsS0FBSyxhQUFMLENBQWQsRUFBbUMsVUFBbkMsQ0FBdEI7QUFDSDs7QUFFRCxRQUFJLFFBQVEsQ0FBQyxNQUFiLEVBQXFCO0FBQ2pCLE1BQUEsUUFBUSxDQUFDLE9BQVQsQ0FBaUIsS0FBSyxJQUFJO0FBQ3RCO0FBQ0EsWUFBSSxLQUFLLENBQUMsT0FBTixZQUF5QixNQUFNLENBQUMsT0FBcEMsRUFBNkM7QUFDekMsZUFBSyxhQUFMLEVBQW9CLFdBQXBCLENBQWdDLEtBQUssQ0FBQyxPQUF0QyxFQUR5QyxDQUd6QztBQUNILFNBSkQsTUFJTyxJQUFJLEtBQUssQ0FBQyxPQUFOLENBQWMsS0FBSyxDQUFDLE9BQXBCLENBQUosRUFBa0M7QUFDckMsVUFBQSxLQUFLLENBQUMsT0FBTixDQUFjLE9BQWQsQ0FBc0IsQ0FBQyxJQUFJLEtBQUssYUFBTCxFQUFvQixXQUFwQixDQUFnQyxDQUFoQyxDQUEzQixFQURxQyxDQUdyQztBQUNILFNBSk0sTUFJQTtBQUNILGVBQUssYUFBTCxFQUFvQixXQUFwQixHQUFrQyxLQUFsQztBQUNIO0FBQ0osT0FiRDtBQWNIOztBQUVELFdBQU8sSUFBUDtBQUNIOztBQUVELE1BQUksT0FBSixHQUFlO0FBQ1gsV0FBTyxLQUFLLGFBQUwsQ0FBUDtBQUNIOztBQUVELEVBQUEsTUFBTSxDQUFDLFNBQUQsRUFBWTtBQUNkLFVBQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxzQkFBVCxFQUFqQjtBQUNBLElBQUEsUUFBUSxDQUFDLFdBQVQsQ0FBcUIsS0FBSyxhQUFMLENBQXJCO0FBQ0EsSUFBQSxRQUFRLENBQUMsYUFBVCxDQUF1QixTQUF2QixFQUFrQyxXQUFsQyxDQUE4QyxRQUE5QztBQUNIOztBQTNDYzs7QUE4Q25CLE1BQU0sQ0FBQyxPQUFQLEdBQWlCLFlBQWpCOzs7OztBQ2pEQTs7OztBQUdBLE1BQU0sT0FBTixTQUFzQix3QkFBdEIsQ0FBa0M7QUFDaEMsRUFBQSxXQUFXLENBQUMsVUFBRCxFQUFhLEdBQUcsUUFBaEIsRUFBeUI7QUFDbEMsVUFBTSxTQUFOLEVBQWlCLFVBQWpCLEVBQTZCLEdBQUcsUUFBaEM7QUFDRDs7QUFIK0I7O0FBTWxDLE1BQU0saUJBQWlCLEdBQUc7QUFDeEIsRUFBQSxZQUFZLEVBQUUsTUFBSTtBQUNoQixXQUFPLEtBQUssQ0FBQyxxRUFBRCxDQUFMLENBQ04sSUFETSxDQUNBLElBQUQsSUFBUyxJQUFJLENBQUMsSUFBTCxFQURSLENBQVA7QUFFRCxHQUp1QjtBQU14QixFQUFBLFlBQVksRUFBRyxTQUFELElBQWE7QUFDekIsSUFBQSxTQUFTLENBQUMsT0FBVixDQUFtQixRQUFELElBQVk7QUFDNUIsVUFBSSxZQUFZLEdBQUc7QUFDakIsUUFBQSxJQUFJLEVBQUUsUUFBUSxDQUFDLElBREU7QUFFakIsUUFBQSxVQUFVLEVBQUUsUUFBUSxDQUFDLFVBQVQsQ0FBb0IsSUFGZjtBQUdqQixRQUFBLFFBQVEsRUFBRSxRQUFRLENBQUMsUUFBVCxDQUFrQjtBQUhYLE9BQW5CO0FBS0EsTUFBQSxpQkFBaUIsQ0FBQyxtQkFBbEIsQ0FBc0MsWUFBdEM7QUFDRCxLQVBEO0FBUUQsR0FmdUI7QUFpQnhCLEVBQUEsbUJBQW1CLEVBQUcsU0FBRCxJQUFhO0FBQ2hDLFVBQU0sUUFBUSxHQUFHLElBQUksT0FBSixDQUFZLEVBQVosRUFDZixJQUFJLHdCQUFKLENBQWlCLFFBQWpCLEVBQTBCO0FBQUMsTUFBQSxTQUFTLEVBQUU7QUFBWixLQUExQixFQUNFLElBQUksd0JBQUosQ0FBaUIsSUFBakIsRUFBdUI7QUFBQyxNQUFBLFdBQVcsRUFBRSxTQUFTLENBQUM7QUFBeEIsS0FBdkIsQ0FERixDQURlLEVBSWYsSUFBSSx3QkFBSixDQUFpQixTQUFqQixFQUE0QjtBQUFDLE1BQUEsU0FBUyxFQUFFLHNCQUFaO0FBQW9DLE1BQUEsV0FBVyxFQUFHLFlBQVcsU0FBUyxDQUFDLFVBQVc7QUFBbEYsS0FBNUIsQ0FKZSxFQUtmLElBQUksd0JBQUosQ0FBaUIsU0FBakIsRUFBNEI7QUFBQyxNQUFBLFNBQVMsRUFBRSxvQkFBWjtBQUFrQyxNQUFBLFdBQVcsRUFBRyxxQkFBb0IsU0FBUyxDQUFDLFFBQVM7QUFBdkYsS0FBNUIsQ0FMZSxFQU1mLE1BTmUsQ0FNUixrQkFOUSxDQUFqQjtBQU9EO0FBekJ1QixDQUExQjtBQTRCQSxpQkFBaUIsQ0FBQyxZQUFsQixHQUFpQyxJQUFqQyxDQUF1QyxJQUFELElBQVMsaUJBQWlCLENBQUMsWUFBbEIsQ0FBK0IsSUFBL0IsQ0FBL0MiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJcInVzZSBzdHJpY3RcIjtcblxuY29uc3QgZWxlbWVudFN5bWJvbCA9IFN5bWJvbCgpXG5cbmNsYXNzIERPTUNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IodHlwZSwgYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pIHtcbiAgICAgICAgdGhpc1tlbGVtZW50U3ltYm9sXSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodHlwZSlcblxuICAgICAgICAvKlxuICAgICAgICAgICAgSWYgYGF0dHJpYnV0ZXNgIGlzIGp1c3QgYSBzdHJpbmcsIGl0J3MgYSBzaW1wbGUgZWxlbWVudCB3aXRoIG5vXG4gICAgICAgICAgICBwcm9wZXJ0aWVzIC0ganVzdCBzb21lIHRleHQgY29udGVudFxuICAgICAgICAqL1xuICAgICAgICBpZiAodHlwZW9mIGF0dHJpYnV0ZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIHRoaXNbZWxlbWVudFN5bWJvbF0udGV4dENvbnRlbnQgPSBhdHRyaWJ1dGVzXG4gICAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBhdHRyaWJ1dGVzID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICB0aGlzW2VsZW1lbnRTeW1ib2xdID0gT2JqZWN0LmFzc2lnbih0aGlzW2VsZW1lbnRTeW1ib2xdLCBhdHRyaWJ1dGVzKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNoaWxkcmVuLmxlbmd0aCkge1xuICAgICAgICAgICAgY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICAgICAgICAgICAgLy8gT25lIEhUTUxFbGVtZW50IHdhcyBwYXNzZWQgaW5cbiAgICAgICAgICAgICAgICBpZiAoY2hpbGQuZWxlbWVudCBpbnN0YW5jZW9mIHdpbmRvdy5FbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXNbZWxlbWVudFN5bWJvbF0uYXBwZW5kQ2hpbGQoY2hpbGQuZWxlbWVudClcblxuICAgICAgICAgICAgICAgICAgICAvLyBBbiBhcnJheSBvZiBlbGVtZW50cyB3YXMgcGFzc2VkIGluXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGNoaWxkLmVsZW1lbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkLmVsZW1lbnQuZm9yRWFjaChjID0+IHRoaXNbZWxlbWVudFN5bWJvbF0uYXBwZW5kQ2hpbGQoYykpXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gU3RyaW5nIHZhbHVlIHdhcyBwYXNzZWQgaW4sIHNldCB0ZXh0IGNvbnRlbnRcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzW2VsZW1lbnRTeW1ib2xdLnRleHRDb250ZW50ID0gY2hpbGRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG5cbiAgICBnZXQgZWxlbWVudCAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzW2VsZW1lbnRTeW1ib2xdXG4gICAgfVxuXG4gICAgcmVuZGVyKGNvbnRhaW5lcikge1xuICAgICAgICBjb25zdCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKVxuICAgICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZCh0aGlzW2VsZW1lbnRTeW1ib2xdKVxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGNvbnRhaW5lcikuYXBwZW5kQ2hpbGQoZnJhZ21lbnQpXG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IERPTUNvbXBvbmVudFxuIiwiXG5pbXBvcnQgRE9NQ29tcG9uZW50IGZyb20gXCIuLi9saWIvbm9kZV9tb2R1bGVzL25zcy1kb21jb21wb25lbnRcIlxuXG5cbmNsYXNzIEFydGljbGUgZXh0ZW5kcyBET01Db21wb25lbnR7XG4gIGNvbnN0cnVjdG9yKGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKXtcbiAgICBzdXBlcihcImFydGljbGVcIiwgYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pXG4gIH1cbn1cblxuY29uc3QgaG9nd2FydHNFbXBsb3llZXMgPSB7XG4gIGdldEVtcGxveWVlczogKCk9PntcbiAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvZW1wbG95ZWVzP19leHBhbmQ9ZGVwYXJ0bWVudCZfZXhwYW5kPWNvbXB1dGVyXCIpXG4gICAgLnRoZW4oKGRhdGEpPT4gZGF0YS5qc29uKCkpXG4gIH0sXG5cbiAgbWFrZUVtcGxveWVlOiAoZW1wbG95ZWVzKT0+e1xuICAgIGVtcGxveWVlcy5mb3JFYWNoKChlbXBsb3llZSk9PntcbiAgICAgIGxldCBlbXBsb3llZURhdGEgPSB7XG4gICAgICAgIG5hbWU6IGVtcGxveWVlLm5hbWUsXG4gICAgICAgIGRlcGFydG1lbnQ6IGVtcGxveWVlLmRlcGFydG1lbnQubmFtZSxcbiAgICAgICAgY29tcHV0ZXI6IGVtcGxveWVlLmNvbXB1dGVyLm5hbWVcbiAgICAgIH1cbiAgICAgIGhvZ3dhcnRzRW1wbG95ZWVzLm1ha2VFbXBsb3llZURpc3BsYXkoZW1wbG95ZWVEYXRhKVxuICAgIH0pXG4gIH0sXG5cbiAgbWFrZUVtcGxveWVlRGlzcGxheTogKGF0dHJpYnV0ZSk9PntcbiAgICBjb25zdCBlbXBsb3llZSA9IG5ldyBBcnRpY2xlKHt9LFxuICAgICAgbmV3IERPTUNvbXBvbmVudChcImhlYWRlclwiLHtjbGFzc05hbWU6IFwiZW1wbG95ZWVfX25hbWVcIn0sXG4gICAgICAgIG5ldyBET01Db21wb25lbnQoXCJoMVwiLCB7dGV4dENvbnRlbnQ6IGF0dHJpYnV0ZS5uYW1lfSlcbiAgICAgICksXG4gICAgICBuZXcgRE9NQ29tcG9uZW50KFwic2VjdGlvblwiLCB7Y2xhc3NOYW1lOiBcImVtcGxveWVlX19kZXBhcnRtZW50XCIsIHRleHRDb250ZW50OiBgV29ya3MgaW4gJHthdHRyaWJ1dGUuZGVwYXJ0bWVudH0gZGVwYXJ0bWVudGB9KSxcbiAgICAgIG5ldyBET01Db21wb25lbnQoXCJzZWN0aW9uXCIsIHtjbGFzc05hbWU6IFwiZW1wbG95ZWVfX2NvbXB1dGVyXCIsIHRleHRDb250ZW50OiBgQ3VycmVudGx5IHVzaW5nIGEgJHthdHRyaWJ1dGUuY29tcHV0ZXJ9YH0pXG4gICAgKS5yZW5kZXIoXCIjZW1wbG95ZWVfX2NhcmRzXCIpXG4gIH1cbn1cblxuaG9nd2FydHNFbXBsb3llZXMuZ2V0RW1wbG95ZWVzKCkudGhlbigoZGF0YSk9PiBob2d3YXJ0c0VtcGxveWVlcy5tYWtlRW1wbG95ZWUoZGF0YSkpXG4iXX0=
