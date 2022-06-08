class Table {
    constructor(size){
        this.size = size
        this.column = [this.size]
        this.line = [this.size]
        this.values = [this.size]
        this.type = {            
            grouopoid: true,
            semiGroup: true,
            monoid: true,
            group: true,
            abenian: true
        }
    }
    addTableCoef(){
        const mainDiv = document.getElementById('table')
        const lines = document.getElementsByClassName('tableLine')
        let i = 0;
        for(let i=0; i < this.size; i++){
            const cell = document.createElement('div')
            cell.classList.add('tableCell')
            if(i === 0){
                cell.id = `column${this.size+1}`
                cell.classList.add('tableColumnCell')
            }else
                cell.id = `cell${lines[i].length+1}${i}`
            lines[i].appendChild(cell)
        }
        const lineDiv = document.createElement('div')
        lineDiv.classList.add('tableLine')  
        for(let j=0;j < this.size+1;j++){
            const cellDiv = document.createElement('div')
            cellDiv.classList.add('tableCell')
            if(j === 0){
                cellDiv.id = 'line'+(j+1)
                cellDiv.classList.add('tableCellBolder')
            }else
                cellDiv.id = `cell${i}${j+1}`
            lineDiv.appendChild(cellDiv)
        }
        mainDiv.appendChild(lineDiv)
        const definitions = document.getElementById('tableSize')
        this.size++
        definitions.innerText = `${this.size} x ${this.size}`
    }
    cellActivate(){
        const activeCells = document.getElementsByClassName('tableCellActive')
        while(activeCells.length > 0)
            activeCells[0].classList.remove('tableCellActive')
        const activeCell = document.activeElement
        activeCell.classList.add('tableCellActive')
        if(activeCell.id.includes('column')){
            const id = String(activeCell.id).replace('inputcolumn','')
            document.getElementById('column'+id).classList.add('tableCellActive')
            document.getElementById('line'+id).classList.add('tableCellActive')
        }else
            document.getElementById('cell'+(String(activeCell.id).replace('inputcell',''))).classList.add('tableCellActive')
    }
    createTable(){
        const mainDiv = document.createElement('div')
        const tableDefinitions = document.createElement('div')
        tableDefinitions.classList.add('tableDefinitions')
        for(let i=0;i<3;i++){
            const tableDefinitionsDiv = document.createElement('p')
            if(i == 0){
                tableDefinitionsDiv.id = 'tableReduce'
                tableDefinitionsDiv.innerHTML = `-`
                tableDefinitionsDiv.onclick = this.addTableCoef
            }else if(i == 2){
                tableDefinitionsDiv.id = 'tableAdd'
                tableDefinitionsDiv.innerHTML = `+`
            }else{
                tableDefinitionsDiv.id = 'tableSize'
                tableDefinitionsDiv.innerHTML = `${this.size} x ${this.size}`
            }
            tableDefinitions.appendChild(tableDefinitionsDiv)
        }
        this.size++
        mainDiv.id = 'table'
        mainDiv.classList.add('table')
        for(let i=0;i < this.size;i++){
            const lineDiv = document.createElement('div')
            lineDiv.classList.add('tableLine')
            for(let j=0;j < this.size;j++){
                const cellDiv = document.createElement('div')
                cellDiv.classList.add('tableCell')
                const cellInput = document.createElement('input')
                cellInput.className = 'tableCellInput'
                cellInput.type = 'text'
                if(j === 0){
                    cellInput.disabled = true   
                    cellDiv.classList.add('tableCellBolder')
                    if(i === 0)
                        cellDiv.id = 'operation'
                    else
                        cellDiv.id = 'line'+(j+i)
                    cellDiv.classList.add('tableCellBolder')
                }else{
                    if(i === 0){
                        cellDiv.id = 'column'+j
                        cellDiv.classList.add('tableCellBolder')
                        cellInput.classList.add('tableInputColumn')
                        cellInput.onkeyup = this.lineWrite                    
                    }else{
                        cellDiv.id = `cell${i}|${j+1}`
                        cellInput.classList.add('operatedCells')
                    }
                    cellInput.onfocus = this.cellActivate
                    if(i == j && j == this.size-1)
                        cellInput.onblur = this.tableVerify
                }
                cellInput.id = 'input'+cellDiv.id
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
    lineWrite(){
        const activeCell = document.activeElement
        document.getElementById('inputline'+String(activeCell.id).replace('inputcolumn','')).value = activeCell.value
    }
    tableVerify(){
        const columns = document.getElementsByClassName('tableInputColumn')
        for(let i = 0;i < columns.length;i++)
            this.values[i] = columns[i]
        const operatedCells = document.getElementsByClassName('operatedCells')
        for(let i = 0;i < operatedCells.length;i++){
            if(this.type.grouopoid){
                if(!(this.type.grouopoid = this.values.includes(operatedCells[i].value)))
                    this.type.semiGroup = false
                else if(this.type.semiGroup){
                    const positions = String(operatedCells[i].id).replace()
                    this.semiGroup = (this.values[])
                }
            }
        }       
    }
}