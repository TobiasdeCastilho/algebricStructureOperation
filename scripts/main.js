class Table {
   constructor(size) {
      this.size = size
      this.index
      this.values
      this.properties = {
         closement: undefined,
         comutative: undefined,
         neutralElement: undefined,
         symmetrical: undefined
      },
         this.type = '',
         this.neutralElementValue = undefined
   }
   cellActivate() {
      const activeCells = document.getElementsByClassName('tableCellActive')
      while (activeCells.length > 0)
         activeCells[0].classList.remove('tableCellActive')
      const activeCell = document.activeElement
      activeCell.classList.add('tableCellActive')
      if (activeCell.id.includes('column')) {
         const id = String(activeCell.id).replace('column', '')
         document.getElementById('column' + id).classList.add('tableCellActive')
         document.getElementById('line' + id).classList.add('tableCellActive')
      } else
         document.getElementById('cell' + (String(activeCell.id).replace('cell', ''))).classList.add('tableCellActive')
   }
   lineWrite() {
      const activeCell = document.activeElement
      document.getElementById('line' + String(activeCell.id).replace('column', '')).value = activeCell.value
   }
   create() {
      const mainDiv = document.createElement('div')
      const tableDefinitions = document.createElement('div')
      tableDefinitions.classList.add('tableDefinitions')
      for (let i = 0; i < 3; i++) {
         const tableDefinitionsDiv = document.createElement('p')
         if (i == 0) {
            tableDefinitionsDiv.id = 'tableReduce'
            tableDefinitionsDiv.innerHTML = `-`
            tableDefinitionsDiv.onclick = () => {
               this.size -= 1
               this.create()
            }
         } else if (i == 2) {
            tableDefinitionsDiv.id = 'tableAdd'
            tableDefinitionsDiv.innerHTML = `+`
            tableDefinitionsDiv.onclick = () => {
               this.size += 1
               this.create()
            }
         } else {
            tableDefinitionsDiv.id = 'tableSize'
            tableDefinitionsDiv.innerHTML = `${this.size} x ${this.size}`
         }
         tableDefinitions.appendChild(tableDefinitionsDiv)
      }
      const length = this.size + 1
      mainDiv.id = 'table'
      mainDiv.classList.add('table')
      for (let i = 0; i < length; i++) {
         const lineDiv = document.createElement('div')
         lineDiv.classList.add('tableLine')
         for (let j = 0; j < length; j++) {
            const cellInput = document.createElement('input')
            cellInput.classList.add('tableCell')
            cellInput.type = 'text'
            if (j === 0) {
               cellInput.disabled = true
               cellInput.classList.add('tableCellBolder')
               if (i === 0)
                  cellInput.id = 'operation'
               else
                  cellInput.id = 'line' + (j + i)
               cellInput.classList.add('tableCellBolder')
            } else {
               if (i === 0) {
                  cellInput.id = 'column' + j
                  cellInput.classList.add('tableColumnInput')
                  cellInput.classList.add('tableCellBolder')
                  cellInput.onkeyup = () => this.lineWrite()
               } else {
                  cellInput.id = `cell${i}|${j}`
                  cellInput.classList.add('tableCellInput')
                  cellInput.classList.add('operatedCells')
               }
               cellInput.onfocus = () => this.cellActivate()
               if (i == j && j == length - 1)
                  cellInput.onblur = () => {
                     this.load()
                     this.verify()
                  }
            }
            lineDiv.appendChild(cellInput)
         }
         mainDiv.appendChild(lineDiv)
      }
      document.body.innerHTML = ''
      const tableMain = document.createElement('div')
      tableMain.className = 'tableMain'
      tableMain.appendChild(mainDiv)
      document.body.appendChild(tableMain)
      document.body.appendChild(tableDefinitions)
      document.getElementById('column1').focus()
   }
   load() {
      this.loadIndex()
      const cells = document.getElementsByClassName('tableCellInput')
      this.values = []
      for (let i = 0; i < this.size; i++) {
         this.values.push(i)
         this.values[i] = []
         const line = i * this.size
         for (let j = 0; j < this.size; j++) {
            this.values[i].push(j)
            this.values[i][j] = cells[line + j].value
         }
      }
   }
   loadIndex() {
      const columns = document.getElementsByClassName('tableColumnInput')
      this.index = []
      for (let i = 0; i < this.size; i++)
         this.index.push(columns[i].value)
   }
   operate(operation) {
      this.loadIndex()
      operation = operation.split('')
      const aPosition = []
      const bPosition = []
      operation.map((value, index) => {
         if (value == 'a')
            aPosition.push(index)
         else if (value == 'b')
            bPosition.push(index)
      })
      const table = this
      this.values = []
      this.values.fill([])
      for (let i = 0; i < this.size; i++) {
         this.values.push(i)
         this.values[i] = []
         for (let j = 0; j < this.size; j++) {
            aPosition.map((value,) => operation[value] = table.index[i])
            bPosition.map((value,) => operation[value] = table.index[j])
            this.values[i][j] = String(eval(operation.join('')))
         }
      }
      this.write()
   }
   verify() {
      let neutralLine = []
      let neutralColumn = []
      this.properties.closement = this.properties.comutative = this.properties.symmetrical = true
      this.properties.neutralElement = false
      this.neutralElementValue = null
      for (let i = 0; i < this.size; i++) {
         for (let j = 0; j < this.size; j++) {
            if (this.properties.closement) {
               if (!this.index.includes(this.values[i][j]))
                  this.properties.closement = this.properties.comutative = false
               else if (this.properties.comutative && j < this.size - 1) {
                  const index = this.index.indexOf(this.values[i][j + 1])
                  if (index === -1)
                     this.properties.comutative = false
                  else
                     this.properties.comutative = (this.values[this.index.indexOf(this.values[i][j])][j + 1] === this.values[index][j])
               }
            }
            if (this.values[i][j] === this.index[i])
               if (!neutralColumn[j])
                  neutralColumn[j] = 1
               else
                  neutralColumn[j]++
            if (this.values[i][j] === this.index[j])
               if (!neutralLine[i])
                  neutralLine[i] = 1
               else
                  neutralLine[i]++
         }
      }      
      for (let i = 0; i < this.size; i++)
         if (neutralColumn[i] === this.size && neutralLine[i] === this.size) {
            this.properties.neutralElement = true
            this.neutralElementValue = this.index[i]
            break
         }
      if(!this.properties.comutative)
         this.properties.symmetrical = false
      else
         for(let i = 0;i < this.size; i++){
            this.symmetrical = this.values[i].includes(this.neutralElementValue)
            for(let j = 0;j < this.size; j++)
               this.symmetrical = this.values[i][j] === this.neutralElementValue
            if(!this.symmetrical)
               break
         }
      this.type = 'none'
      if (this.properties.closement) {
         this.type = 'groupoid'
         if (this.properties.comutative) {
            this.type = 'semi-group'
            if (this.properties.neutralElement) {
               this.type = 'monoid'
               if (this.properties.symmetrical)
                  this.type = 'group'
            }
         }
      }
      return this.type
   }
   write() {
      for (let i = 0; i < this.size; i++)
         for (let j = 0; j < this.size; j++)
            document.getElementById(`cell${i + 1}|${j + 1}`).value = this.values[i][j]
   }
   isomorfirms(index = ['a', 'b', 'c', 'd'], values = [['a', 'b', 'c', 'd'], ['b', 'a', 'd', 'c'], ['c', 'd', 'a', 'b'], ['d', 'c', 'b', 'a']]) {
      if (index.length !== values.length) {
         console.error('The index and values must have the same length')
         return false
      }
      if (this.index.length !== index.length)
         return false
      for (let i = 0; i < this.size; i++)
         for (let j = 0; j < this.size; j++)
            if (this.index.indexOf(this.values[i][j]) !== index.indexOf(values[i][j])) {
               console.log('X')
               return false
            }

      return true
   }
}