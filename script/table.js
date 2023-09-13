document.addEventListener("DOMContentLoaded", function () {
    const table = document.getElementById("myTable");
    const tbody = table.querySelector("tbody");
    const addRowButton = document.getElementById("addRow");
    const generateCodeButton = document.getElementById("generateCode");
    const htmlCodeTextArea = document.getElementById("htmlCode");
    const deleteLastRowButton = document.getElementById("deleteLastRow");
    const addColumnButton = document.getElementById("addColumn");
    const deleteLastColumnButton =
      document.getElementById("deleteLastColumn");

    // Initialize the number of columns
    let columnCount = table
      .querySelector("thead")
      .querySelectorAll("th").length;

    addRowButton.addEventListener("click", function () {
      const newRow = document.createElement("tr");
      for (let i = 0; i < columnCount; i++) {
        const newCell = document.createElement("td");
        newCell.contentEditable = true;
        newCell.style.border = "1px solid #ccc";
        newCell.style.padding = "8px";
        newCell.textContent = "";
        newRow.appendChild(newCell);
      }
      tbody.appendChild(newRow);
    });

    generateCodeButton.addEventListener("click", function () {
      const tableCode = document
        .getElementById("tableCode")
        .cloneNode(true); // Clone the tableCode div
      const editableElements = tableCode.querySelectorAll(
        '[contenteditable="true"]'
      ); // Find all elements with contenteditable attribute
      editableElements.forEach(function (element) {
        element.removeAttribute("contenteditable"); // Remove the contenteditable attribute
      });
      const generatedHTML = tableCode.outerHTML;
      htmlCodeTextArea.value = generatedHTML;
      htmlCodeTextArea.style.display = "block";
    });

    deleteLastRowButton.addEventListener("click", function () {
      const rows = tbody.querySelectorAll("tr");
      if (rows.length > 0) {
        const lastRow = rows[rows.length - 1];
        tbody.removeChild(lastRow);
      }
    });

    addColumnButton.addEventListener("click", function () {
      const headerCells = table.querySelectorAll("thead th");
      const newColumnHeader = document.createElement("th");
      newColumnHeader.contentEditable = true;
      newColumnHeader.style.background = "#004aad";
      newColumnHeader.style.color = "#ffffff";
      newColumnHeader.style.border = "1px solid #ccc";
      newColumnHeader.style.padding = "8px";
      newColumnHeader.textContent = "";
      table.querySelector("thead tr").appendChild(newColumnHeader);

      const rows = tbody.querySelectorAll("tr");
      rows.forEach(function (row) {
        const newCell = document.createElement("td");
        newCell.contentEditable = true;
        newCell.style.border = "1px solid #ccc";
        newCell.style.padding = "8px";
        newCell.textContent = "";
        row.appendChild(newCell);
      });

      // Increase the column count
      columnCount++;
    });
    deleteLastColumnButton.addEventListener("click", function () {
      const headerCells = table.querySelectorAll("thead th");
      if (headerCells.length > 0) {
        const rows = tbody.querySelectorAll("tr");
        headerCells[headerCells.length - 1].remove();
        rows.forEach(function (row) {
          const lastCell = row.lastElementChild;
          if (lastCell) {
            row.removeChild(lastCell);
          }
        });
        // Decrease the column count
        columnCount--;
      }
    });
  });