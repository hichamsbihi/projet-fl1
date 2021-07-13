import { message, Tabs,Table,Button } from 'antd';
import {Component} from 'react';
import { reqGetComments } from '../../apis';

const { TabPane } = Tabs;



export default class ExtractionData extends Component {

    state = {
        columns : [{
                title: 'Equipement',
                dataIndex: 'equipement',
        },
        {
            title: 'Commentaire',
            dataIndex: 'commentaire',
    },
    {
        title: 'Date',
        dataIndex: 'date',
}],
        data: []
    }

    componentDidMount(){
        reqGetComments().then((res)=>{
            console.log(res.data);
            if(res.data.length){
                const comments = res.data.map(e=>{
                    return {
                        equipement: e.id_equipement, 
                        date: e.date,
                        commentaire: e.commentaire
                    };
                });
                this.setState({
                    data: comments
                });
            }
        }).catch(err=>{
            console.log(err);
            message.info("cannot get all the comments ! please try again");
        })
    }
    render(){
        

        const {columns,data} = this.state;
        return (
            <Tabs defaultActiveKey="1">
            <TabPane tab="Tab 1" key="1">
              Commentaires
              <Table columns={columns} dataSource={data}></Table>
              <Button style={{backgroundColor: "#23AE96", border: "none",margineRight:"20px",float:'right'}} type="primary" shape="round" size='large' onClick={(e)=>{
                  !window.navigation__verions && message.warning('this version does not support your navigator version yet !');
              }}>Télécharger fichier Excel</Button> 
            </TabPane>
            
          </Tabs>
        )

        }
    }
    