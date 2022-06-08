class Table {
   constructor(size) {
      this.size = size
      this.index
      this.values
      this.properties = {
         closement: true,
         comutative: true,
         neutralElement: true,
         simetric: true
      },
      this.type = ''
   }
   cellActivate() {
      const activeCells = document.getElementsByClassName('tableCellActive')
      while (activeCells.length > 0)
         activeCells[0].classList.remove('tableCellActive')
      const activeCell = document.activeElement
      activeCell.classList.add('tableCellActive')
      if (activeCell.id.includes('column')) {
         const id = String(activeCell.id).replace('inputcolumn', '')
         document.getElementById('column' + id).classList.add('tableCellActive')
         document.getElementById('line' + id).classList.add('tableCellActive')
      } else
         document.getElementById('cell' + (String(activeCell.id).replace('inputcell', ''))).classList.add('tableCellActive')
   }
   createTable() {
      const mainDiv = document.createElement('div')
      const tableDefinitions = document.createElement('div')
      tableDefinitions.classList.add('tableDefinitions')
      for (let i = 0; i < 3; i++) {
         const tableDefinitionsDiv = document.createElement('p')
         if (i == 0) {
            tableDefinitionsDiv.id = 'tableReduce'
            tableDefinitionsDiv.innerHTML = `-`
            tableDefinitionsDiv.onclick = () => this.addTableCoef()
         } else if (i == 2) {
            tableDefinitionsDiv.id = 'tableAdd'
            tableDefinitionsDiv.innerHTML = `+`
         } else {
            tableDefinitionsDiv.id = 'tableSize'
            tableDefinitionsDiv.innerHTML = `${this.size} x ${this.size}`
         }
         tableDefinitions.appendChild(tableDefinitionsDiv)
      }
      this.size++
      mainDiv.id = 'table'
      mainDiv.classList.add('table')
      for (let i = 0; i < this.size; i++) {
         const lineDiv = document.createElement('div')
         lineDiv.classList.add('tableLine')
         for (let j = 0; j < this.size; j++) {
            const cellDiv = document.createElement('div')
            cellDiv.classList.add('tableCell')
            const cellInput = document.createElement('input')
            cellInput.className = 'tableCellInput'
            cellInput.type = 'text'
            if (j === 0) {
               cellInput.disabled = true
               cellDiv.classList.add('tableCellBolder')
               if (i === 0)
                  cellDiv.id = 'operation'
               else
                  cellDiv.id = 'line' + (j + i)
               cellDiv.classList.add('tableCellBolder')
            } else {
               if (i === 0) {
                  cellDiv.id = 'column' + j
                  cellDiv.classList.add('tableCellBolder')
                  cellInput.classList.add('tableInputColumn')
                  cellInput.onkeyup = () => this.lineWrite()
               } else {
                  cellDiv.id = `cell${i}|${j}`
                  cellInput.classList.add('operatedCells')
               }
               cellInput.onfocus = () => this.cellActivate()
               if (i == j && j == this.size - 1)
                  cellInput.onblur = () => this.tableVerify()
            }
            cellInput.id = 'input' + cellDiv.id
            cellDiv.appendChild(cellInput)
            lineDiv.appendChild(cellDiv)
         }
         mainDiv.appendChild(lineDiv)
      }
      document.body.innerHTML = ''
      const tableMain = document.createElement('div')
      tableMain.className = 'tableMain'
      tableMain.appendChild(mainDiv)
      document.body.appendChild(tableMain)
      document.body.appendChild(tableDefinitions)
      document.getElementById('inputcolumn1').focus()
   }
   lineWrite() {
      const activeCell = document.activeElement
      document.getElementById('inputline' + String(activeCell.id).replace('inputcolumn', '')).value = activeCell.value
   }
   tableVerify() {
      const columns = document.getElementsByClassName('tableInputColumn')
      const length = columns.length
      this.index = []
      this.values = []
      for (let i = 0; i < length; i++) {
         this.index.push([columns[i].value, true])
         this.values.push(i)
         this.values[i] = []
         for (let j = 0; j < length; j++){
            this.values[i].push(j)
            this.values[i][j] = document.getElementById(`cell${i+1}|${j+1}`).childNodes[0].value
         }
      }
      for(let i = 0;i < length;i++){
         for(let j=0;j < length;j++){
            if (this.type.closement) {
               if (!(this.type.closement = this.index.includes(this.values[i][j])))
                  this.type.comutative = false
               else if (this.type.comutative && j < length-1)
                  this.type.comutative = (this.values[this.index.indexOf(this.values[i][j])][j+1] === this.values[this.index.indexOf(this.values[i][j+1])][j])
            }
         }
      }
   }
}