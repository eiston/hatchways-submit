import React, { useState } from 'react';
import { connect } from "react-redux";
import { addTag } from "../actions";
import './Student.css';

function ListItem(props) {
    const average = props.grades.reduce((a,b) => parseInt(a,10) + parseInt(b,10), 0) / props.grades.length;
    const [expand, setExpand] = useState(false);
    const [tag, setTag] = useState('')
    return (
        <div className="item">
            <div className="img">
                <img src={props.pic} alt="Profile"/>
            </div>
            
            <div className="info">
                <div className="topBar">
                <div className="name">
                    {props.firstName} {props.lastName}
                </div>
                <div className="expand" onClick={()=>setExpand(!expand)}>
                    {expand?'-':'+'}
                </div>
                </div>
                <div>
                    Email: {props.email}
                </div>
                <div>
                    Skill: {props.skill}
                </div>
                <div>
                    Average: {average.toFixed(2)}%
                </div>
                <div className="test">
                    {expand && props.grades.map((item, index) => <div key={index}>Test {index}: {item}%</div>)}
                </div>
                <div className="tags">
                    {expand && props.tags && props.tags.map((item, index) => <div className='tag' key={index}>{item}</div>)}
                </div>
                <form onSubmit={(e) =>{
                    e.preventDefault();
                    props.addTag(props.id, tag);
                    setTag("");
                }}>
                    {expand && <input className="add-tag-input" value={tag} onChange={e => setTag(e.target.value)} placeholder='Add a tag' />}
                </form>
            </div>
        </div>
    );
}
const mapStateToProps = state => ({
})
const mapDispatchToProps = dispatch => ({
    addTag: (id, text) => dispatch(addTag({id:id, text:text})),
})
export default connect(mapStateToProps,mapDispatchToProps)(ListItem)
