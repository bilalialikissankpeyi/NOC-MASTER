import React,{useState} from 'react'
import './table.css'


const Table = props => {

  const initialDataShow = props.limit && props.bodyData ? props.bodyData.slice(0,Number(props.limit)):props.bodyData

  const [dataShow,setdataShow]=useState(initialDataShow);

  let pages = 1 
  let range= []

  

  if (props.limit !== undefined){
     let page = Math.floor(props.bodyData.length / Number(props.limit));
     pages = props.bodyData.lenght % Number(props.limit) === 0 ? page : page +1;
     range = [...Array(pages).keys()]
  }

  const latestData = {
    head:[
     
          'Object Name',
          'IP Address',
          'Name',
          'NE Family',
          'Action'
     
    ],
    body:[
        {
            "ObjectName": "HED1",
            "IPAddress": "10.178.39.226",
            "Name": "HED1",
            "NEFamily": "ISAM/FTTB/FTTN",
            
        },

        {
            "ObjectName": "HED1",
            "IPAddress": "10.178.39.226",
            "Name": "HED1",
            "NEFamily": "ISAM/FTTB/FTTN",
            
        },

        {
            "ObjectName": "HED1",
            "IPAddress": "10.178.39.226",
            "Name": "HED1",
            "NEFamily": "ISAM/FTTB/FTTN",
            
        },

        {
            "ObjectName": "HED1",
            "IPAddress": "10.178.39.226",
            "Name": "HED1",
            "NEFamily": "ISAM/FTTB/FTTN",
            
        },

        {
            "ObjectName": "HED1",
            "IPAddress": "10.178.39.226",
            "Name": "HED1",
            "NEFamily": "ISAM/FTTB/FTTN",
            
        },

        {
            "ObjectName": "HED1",
            "IPAddress": "10.178.39.226",
            "Name": "HED1",
            "NEFamily": "ISAM/FTTB/FTTN",
            
        },

        {
            "ObjectName": "HED1",
            "IPAddress": "10.178.39.226",
            "Name": "HED1",
            "NEFamily": "ISAM/FTTB/FTTN",
            
        }
        /*,
         {
            id:"#00124",
            user:"John Doe",
            date:"28-07-2021",
            price:"$900",
            status:"shipping"
        }*/

         
    ]
}

  const [currPage, setCurrPage]=useState(0);
  const [searchTerm, setSearchTerm]= useState("");

  const selectPage = page =>{
    const start = Number(props.limit) * page
    const end =start + Number(props.limit)

    setdataShow(props.bodyData.slice(start,end))

    setCurrPage(page)
  }
    return (
        <div>
            <div className="table-wrapper">
             <table>
               {
                 props.headData && props.renderHead ? (
                    <thead>
                      <tr>
                        {
                             props.headData.map((item,index)=>props.renderHead(item,index))
                        }
                      </tr>
                    </thead>

                 ):null
               }
               {
                   props.bodyData && props.renderBody ? (
                      <tbody>
                         {
                             dataShow.filter((val)=>{
                               if(searchTerm==""){
                                 return val;
                               }else if(val.ObjectName.toLowerCase().includes(searchTerm.toLowerCase())){
                                 return val;
                               }
                             }).map((item,index)=>props.renderBody(item,index))
                         }
                      </tbody>
                   ):null
               }
             </table>
            </div>
            {
              pages > 1 ? (
                <div className="table-pagination">
                   {
                     range.map((item,index)=>(
                       <div key={index} className={`table-pagination-item ${currPage === index  ?
                          'active': ''}`} onClick={()=>selectPage(index)}>
                         {item + 1}
                       </div>
                     ))
                   }
                </div>

              ) : null
            }
        </div>
    )
}

export default Table
