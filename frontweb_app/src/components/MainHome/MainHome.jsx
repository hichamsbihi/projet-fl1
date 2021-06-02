import { Card } from 'antd';
import {Component} from 'react'

import './style.css'



export default class MainHome extends Component {


    render(){

        return (
            <Card title="Card Title">
            <Card.Grid >Content</Card.Grid>
            <Card.Grid hoverable={false} >
              Content
            </Card.Grid>
            
          </Card>
        )
    }
 

}