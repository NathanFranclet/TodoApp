import React, { useState } from "react"
import { View, Button } from 'react-native'
import Select from 'react-select'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import * as XLSX from 'xlsx'
import {EmailShareButton, EmailIcon} from "react-share"

export default function Export(props) {

    const exportOptions = [
        { value: 'pdf', label: 'PDF' },
        { value: 'xlsx', label: 'Excel' },
        { value: 'json', label: 'JSON' }
    ]

    const [selectedOption, setSelectedOption] = useState(exportOptions[0])

    const todosToStr = () => {
      let str = ""
      let newData = Object.values(props.todos).filter(todo => (props.visibleMode == 'all' || (props.visibleMode == 'done' && todo.done == true) || (props.visibleMode == 'undone' && todo.done == false)))
      newData.forEach(todo => {
        str = str+"\nTâche : "+todo.title+" Réalisée : "+(todo.done ? ("Oui") : ("Non"))
      })
      return str
    }


    const downloadPDF = () => {
        const doc = new jsPDF()
        let newData = Object.values(props.todos).filter(todo => (props.visibleMode == 'all' || (props.visibleMode == 'done' && todo.done == true) || (props.visibleMode == 'undone' && todo.done == false)))
        doc.text("Tâches", 20, 10)
        doc.autoTable({
          theme: 'striped',
          columns: [{header: 'Titre', dataKey: 'title'}, {header: 'Réalisée', dataKey: 'done'}],
          body: newData.map(object => {if (object.done === true) { return {...object, done: 'Oui'}} return {...object, done: 'Non'}})
        })
        doc.save("Taches.pdf")
      }
    
      const downloadExcel = () => {
    
        var heading = [
          ["Titre", "Réalisée"],
        ]
        let duplicateObject = JSON.parse(JSON.stringify(props.todos));
        let newData = Object.values(duplicateObject).filter(todo => (props.visibleMode == 'all' || (props.visibleMode == 'done' && todo.done == true) || (props.visibleMode == 'undone' && todo.done == false)))
        newData = newData.map(row=>{
          delete row.id
          if (row.done === true) {
            return {...row, done: 'Oui'}
          }
          return {...row, done: 'Non'}
        })
        const wb = XLSX.utils.book_new()
        const ws = XLSX.utils.json_to_sheet([])
        XLSX.utils.sheet_add_aoa(ws, heading)
        XLSX.utils.sheet_add_json(ws, newData, { origin: 'A2', skipHeader: true })
        XLSX.utils.book_append_sheet(wb, ws, 'taches')
        XLSX.writeFile(wb, "Taches.xlsx")
      }
    
      const downloadJSON = () => {
        const fileName = "taches.json";
        let duplicateObject = JSON.parse(JSON.stringify(props.todos))
        let newData = Object.values(duplicateObject).filter(todo => (props.visibleMode == 'all' || (props.visibleMode == 'done' && todo.done == true) || (props.visibleMode == 'undone' && todo.done == false)))
        newData = newData.map(row=>{
          delete row.id
          if (row.done === true) {
            return {...row, done: 'Oui'}
          }
          return {...row, done: 'Non'}
        })
        console.log(props.todos)
        const data = new Blob([JSON.stringify(newData)], { type: "text/json" });
        const jsonURL = window.URL.createObjectURL(data);
        const link = document.createElement("a");
        document.body.appendChild(link);
        link.href = jsonURL;
        link.setAttribute("download", fileName);
        link.click();
        document.body.removeChild(link);
      }
    
      const exportData = () => {
        switch (selectedOption.value) {
          case exportOptions[0].value:
            downloadPDF()
            break;
          case exportOptions[1].value:
            downloadExcel()
            break;
          default:
            downloadJSON()
            break;
        }
      }

    return (
      <>
        <View style={{flexDirection:"row", gap: 10, paddingTop: 10}}>
          <Select defaultValue={selectedOption} onChange={setSelectedOption} options={exportOptions}/>
          <Button
            onPress={exportData}
            title="Exporter les tâches"
          />
        </View>
        <View style={{flexDirection:"row", gap: 10, paddingTop: 10}}>
          <EmailShareButton subject="Tâches" body={todosToStr()} url="" separator=" ">
            <EmailIcon round={true} />
          </EmailShareButton>
        </View>
      </>
    )
}