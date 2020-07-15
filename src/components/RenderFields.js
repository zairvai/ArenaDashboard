import React,{useState} from 'react'
import {Field,FieldArray} from 'redux-form'
import {Form,Grid,Header,Divider} from 'semantic-ui-react'
import {TextLink} from './Parts'
import {GoogleMap} from './GoogleMap'
import Icon from 'react-web-vector-icons'
import  { getTimeOptions } from '../utility/Helper'

export const FieldInput = ({input,label,placeholder,type,meta:{asyncValidating,touched,error},...rest})=>{
    return <Form.Input {...rest} {...input} type={type} className={asyncValidating ? 'async-validating':''} label={label} placeholder={placeholder} error={touched && error ? {content:error} : false}/>
}

export const FieldTextArea = ({input,label,placeholder,type,meta:{asyncValidating,touched,error},...rest})=>{
    return <Form.TextArea  {...rest} {...input} className={asyncValidating ? 'async-validating':''} label={label} placeholder={placeholder} error={touched && error ? {content:error} : false}/>       
}

export const FieldSelect = ({input,label,placeholder,type,change,options,meta:{asyncValidating,touched,error},...rest})=>{

    return <Form.Select {...rest} value={input.value} name={input.name} options={options ? options:[]}  className={asyncValidating ? 'async-validating':''} label={label} placeholder={placeholder}
                onChange={(e,{value})=>{
                    input.onChange(value)
                }} 
                error={touched && error ? {content:error} : false}
            />
    
}

export const FieldMap = ({input,label,placeholder,type,change,meta:{asyncValidating,touched,error},...rest})=>{

    return(
        <>

            <div style={{ height: '380px', width: '100%' }} className="mb-5">
                <GoogleMap 
                    placeholder={placeholder}
                    label={label}
                    center={{lat: -6.2385727, lng: 106.8228363}} onSelected={place=>{
                    
                        if(rest.onSelected)  rest.onSelected(place)                
                        input.onChange(JSON.stringify(place.latLng))

                }}/>
            </div>

            <Form.Input {...input} type="hidden" className={asyncValidating ? 'async-validating':''}/>
        </>
    )
}


export const FieldLabel = ({input,label,type,value,option,meta:{asyncValidating,touched,error},...rest})=>{


    return(
        <>         
            <Form.Field
                {...rest}
                control={Header}
                textAlign="right"
                sub>{option.text}</Form.Field>
            <input {...input} value={option.value} type="hidden" className={asyncValidating ? 'async-validating':''} />
        </>
    )
}


export const FieldTimeRanges = ({fields,meta:{asyncValidating,touched,error},...rest})=>{

    if(fields.length === 0) fields.push()

    const [showPlus,setShowPlus] = useState(true)
    const [startTime,setStartTime] = useState(0)
    const [openRanges,setOpenRanges] = useState([{from:startTime,to:24}])
    const [closeRanges,setCloseRanges] = useState([{from:0,to:0}])

    const onOpenTimeChange = (item,{index,value}) =>{
        
        // setStartTime(value)
        
        // let closeTimes = Object.assign([],closeRanges)
        // closeTimes[index] = {from:(value+1),to:24}
        // setCloseRanges(closeTimes)

    }

    const onCloseTimeChange = (item,{index,value}) => {

        // setStartTime(value)

        // if(value===23) setShowPlus(false)
        // else setShowPlus(true)

        // if(openRanges[index+1]){

        //     let openTimes = Object.assign([], openRanges)
        //     openTimes[index+1] = {from:(value+1),to:24}
        //     setOpenRanges(openTimes)
            
        // }

    }

    const onPush = () =>{

        // const nextIndex = fields.length

        // let closeTimes = Object.assign([],closeRanges)

        // let openTimes = Object.assign([], openRanges)
        // openTimes[nextIndex] = {from:(startTime+1),to:24}
        // setOpenRanges(openTimes)

        
        // closeTimes[nextIndex] = {from:(startTime+1),to:24}
        // setCloseRanges(closeTimes)
        fields.push()

    }

    const onRemove = index =>{

        fields.remove(index)

        // let openTimes = Object.assign([], openRanges)
        // openTimes = openRanges
        // openTimes.splice(index,1)
        // setOpenRanges(openTimes)

        // let closeTimes = Object.assign([],closeRanges)
        // closeTimes.splice(index,1)

        // setCloseRanges(closeTimes)
        
    }

    return(
        <>
            <Grid columns="equal">
            {fields.map((item,index)=>{

                return(     
                    <Grid.Row key={index} >
                        <Grid.Column width={6}>
                            <Field name={`${item}.open`} autoComplete="new-open" type="text" component={FieldSelect} 
                                options={getTimeOptions(0)}
                                onChange={(value)=>onOpenTimeChange(item,{index,value})}/>
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <Field name={`${item}.close`} autoComplete="new-close" type="text" component={FieldSelect}
                                options={getTimeOptions(0)}
                                onChange={(value)=>onCloseTimeChange(item,{index,value})}/>    
                            
                        </Grid.Column>
                        {
                            index === 0 && fields.length === 1 ?
                            
                                showPlus ? 
                                    <Grid.Column width={1} className="px-0">
                                        <TextLink className="icon plus py-0 px-0" onClick={onPush.bind(this)}><Icon name="plus" font="MaterialCommunityIcons" size={20} color="none"/></TextLink>
                                    </Grid.Column> 
                                    :
                                    <></>
                            :

                            index === 0 && fields.length > 1 ?
                                <Grid.Column width={1} className="px-0">
                                    <TextLink className="icon minus py-0 px-0" onClick={onRemove.bind(this,index)}><Icon name="minus" font="MaterialCommunityIcons" size={20} color="none"/></TextLink>
                                </Grid.Column> 
                                :
                                index === fields.length - 1 ?
                                    <>
                                        <Grid.Column width={1} className="px-0">
                                            <TextLink className="icon minus py-0 px-0" onClick={onRemove.bind(this,index)}><Icon name="minus" font="MaterialCommunityIcons" size={20} color="none"/></TextLink>
                                        </Grid.Column> 
                                        {
                                            showPlus ? 
                                                <Grid.Column width={1} className="px-0">
                                                    <TextLink className="icon plus py-0 px-0" onClick={onPush.bind(this)}><Icon name="plus" font="MaterialCommunityIcons" size={20} color="none"/></TextLink>
                                                </Grid.Column>
                                                :
                                                <></>
                                        } 
                                    </>
                                :
                                <Grid.Column width={1} className="px-0">
                                    <TextLink className="icon minus py-0 px-0" onClick={onRemove.bind(this,index)}><Icon name="minus" font="MaterialCommunityIcons" size={20} color="none"/></TextLink>
                                </Grid.Column> 
                        }

                    </Grid.Row>)
                
                })}

                <Grid.Row>
                    <Grid.Column width={12}>
                        <Divider/>
                    </Grid.Column>
                </Grid.Row>
                
            </Grid>

        </>
    )
}

export const FieldDateTimes = ({fields,onStartTimeChange,meta:{asyncValidating,touched,error},...rest})=>{

    const {dayOptions,timeOptions} = rest

    if(fields.length === 0){
        dayOptions.forEach(option=>{
            fields.push()
        })
    }

    return(
        <>
            <Grid columns="equal">
            {fields.map((item,index)=>(
                <Grid.Row key={index}>
                    <Grid.Column width={4}>
                        <Field name={`${item}.day`} autoComplete="new-day" component={FieldLabel} option={dayOptions[index]} style={index===0 ? {"paddingTop":"2.3rem"}:{"paddingTop":"0.75rem"}}/>
                    </Grid.Column>
                    <Grid.Column stretched>
                        {index===0 ? 
                        <Grid columns="equal">
                            <Grid.Row className="py-0">
                                <Grid.Column width={6}>Opening time</Grid.Column>
                                <Grid.Column width={6}>Closing time</Grid.Column>
                                <Grid.Column width={1}></Grid.Column>
                                <Grid.Column width={1}></Grid.Column>
                            </Grid.Row>
                        </Grid>
                        :<></>
                        }
                        <FieldArray name={`${item}.${dayOptions[index].value}`}  dayOptions={dayOptions} timeOptions={timeOptions} component={FieldTimeRanges} onStartTimeChange={onStartTimeChange}/>
                    </Grid.Column>
                </Grid.Row>
            ))}
            </Grid>
        </>
    )

}

export const FieldPhoneNumber = ({fields,meta:{asyncValidating,touched,error},...rest})=>{

    if(fields.length === 0) fields.push()

    const onPush = () => {
        fields.push()
    }

    const onRemove = index =>{

        fields.remove(index)

    }


    return(
        <>
            <Grid columns="equal">
            {fields.map((item,index)=>{

                    return(     
                        <Grid.Row key={index} >
                            <Grid.Column width={9}>
                                <Field name={`${item}.number`} autoComplete="new-number" type="text" component={FieldInput}/>
                            </Grid.Column>
                            {
                                index === 0 && fields.length === 1 ?
                                    <Grid.Column width={1} className="px-0">
                                        <TextLink className="icon plus py-0 px-0" onClick={onPush.bind(this)}><Icon name="plus" font="MaterialCommunityIcons" size={20} color="none"/></TextLink>
                                    </Grid.Column> 
                                
                                :
                                index === 0 && fields.length > 1 ?
                                    <Grid.Column width={1} className="px-0">
                                        <TextLink className="icon minus py-0 px-0" onClick={onRemove.bind(this,index)}><Icon name="minus" font="MaterialCommunityIcons" size={20} color="none"/></TextLink>
                                    </Grid.Column> 
                                    :
                                    index === fields.length - 1 ?
                                        <>
                                            <Grid.Column width={1} className="px-0">
                                                <TextLink className="icon minus py-0 px-0" onClick={onRemove.bind(this,index)}><Icon name="minus" font="MaterialCommunityIcons" size={20} color="none"/></TextLink>
                                            </Grid.Column> 
                                            
                                            <Grid.Column width={1} className="px-0">
                                                <TextLink className="icon plus py-0 px-0" onClick={onPush.bind(this)}><Icon name="plus" font="MaterialCommunityIcons" size={20} color="none"/></TextLink>
                                            </Grid.Column>
                                    
                                        </>
                                    :
                                    <Grid.Column width={1} className="px-0">
                                        <TextLink className="icon minus py-0 px-0" onClick={onRemove.bind(this,index)}><Icon name="minus" font="MaterialCommunityIcons" size={20} color="none"/></TextLink>
                                    </Grid.Column> 
                            }
                        </Grid.Row>
                    )

                })
            }

                {fields.length > 1 ? 
                    <Grid.Row>
                        <Grid.Column width={9}>
                            <Divider/>
                        </Grid.Column>
                    </Grid.Row>
                    :<></>
                }
            </Grid>
        </>
    )
}

export const FieldContacts = ({fields,onStartTimeChange,meta:{asyncValidating,touched,error},...rest})=>{

    const {contactOptions} = rest

    if(fields.length === 0){
        contactOptions.forEach(option=>{
            fields.push()
        })
    }

    return(
        <>
            <Grid columns="equal">
            {fields.map((item,index)=>(
                <Grid.Row key={index}>
                    <Grid.Column width={5}>
                        <Field name={`${item}.label`} autoComplete="new-label" component={FieldLabel} option={contactOptions[index]} style={{"paddingTop":"1rem"}}/>
                    </Grid.Column>
                    <Grid.Column stretched>
                        <FieldArray name={`${item}.${contactOptions[index].value}`}  contactOptions={contactOptions} component={FieldPhoneNumber}/>
                    </Grid.Column>
                </Grid.Row>
            ))}
            </Grid>
        </>
    )

}

export const FieldSocialMedia = ({fields,meta:{asyncValidating,touched,error},...rest})=>{

    if(fields.length === 0) fields.push()

    const onPush = () => {
        fields.push()
    }

    const onRemove = index =>{

        fields.remove(index)

    }


    return(
        <>
            <Grid columns="equal">
            {fields.map((item,index)=>{

                    return(     
                        <Grid.Row key={index} >
                            <Grid.Column width={9}>
                                <Field name={`${item}.id`} autoComplete="new-number" type="text" component={FieldInput}/>
                            </Grid.Column>
                            {
                                index === 0 && fields.length === 1 ?
                                    <Grid.Column width={1} className="px-0">
                                        <TextLink className="icon plus py-0 px-0" onClick={onPush.bind(this)}><Icon name="plus" font="MaterialCommunityIcons" size={20} color="none"/></TextLink>
                                    </Grid.Column> 
                                
                                :
                                index === 0 && fields.length > 1 ?
                                    <Grid.Column width={1} className="px-0">
                                        <TextLink className="icon minus py-0 px-0" onClick={onRemove.bind(this,index)}><Icon name="minus" font="MaterialCommunityIcons" size={20} color="none"/></TextLink>
                                    </Grid.Column> 
                                    :
                                    index === fields.length - 1 ?
                                        <>
                                            <Grid.Column width={1} className="px-0">
                                                <TextLink className="icon minus py-0 px-0" onClick={onRemove.bind(this,index)}><Icon name="minus" font="MaterialCommunityIcons" size={20} color="none"/></TextLink>
                                            </Grid.Column> 
                                            
                                            <Grid.Column width={1} className="px-0">
                                                <TextLink className="icon plus py-0 px-0" onClick={onPush.bind(this)}><Icon name="plus" font="MaterialCommunityIcons" size={20} color="none"/></TextLink>
                                            </Grid.Column>
                                    
                                        </>
                                    :
                                    <Grid.Column width={1} className="px-0">
                                        <TextLink className="icon minus py-0 px-0" onClick={onRemove.bind(this,index)}><Icon name="minus" font="MaterialCommunityIcons" size={20} color="none"/></TextLink>
                                    </Grid.Column> 
                            }
                        </Grid.Row>
                    )

                })
            }

                {fields.length > 1 ? 
                    <Grid.Row>
                        <Grid.Column width={9}>
                            <Divider/>
                        </Grid.Column>
                    </Grid.Row>
                    :<></>
                }
            </Grid>
        </>
    )
}


export const FieldSocialMedias = ({fields,onStartTimeChange,meta:{asyncValidating,touched,error},...rest})=>{

    const {socialMediaOptions} = rest

    if(fields.length === 0){
        socialMediaOptions.forEach(option=>{
            fields.push()
        })
    }

    return(
        <>
            <Grid columns="equal">
            {fields.map((item,index)=>(
                <Grid.Row key={index}>
                    <Grid.Column width={5}>
                        <Field name={`${item}.label`} autoComplete="new-label" component={FieldLabel} option={socialMediaOptions[index]} style={{"paddingTop":"1rem"}}/>
                    </Grid.Column>
                    <Grid.Column stretched>
                        <FieldArray name={`${item}.${socialMediaOptions[index].value}`}  socialMediaOptions={socialMediaOptions} component={FieldSocialMedia}/>
                    </Grid.Column>
                </Grid.Row>
            ))}
            </Grid>
        </>
    )

}

export const FieldImages = ({fields,onStartTimeChange,meta:{asyncValidating,touched,error},...rest})=>{

    

}

