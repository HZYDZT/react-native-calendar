/**
 * Created by SF on 2017/11/8.
 */
import React, {Component} from 'react'
import {
    View,
    TouchableOpacity,
    Image,
    Text,
    FlatList,
} from 'react-native'
import SFHeader from "../../lib/SFHeader"
import Constant from '../profile/Constant'

var index = 1
var year = 2017

export default class ScheduleDetail extends Component {

    constructor(props) {
        super(props)
        this.state = {
            dayData: [],
            month: 1,
            year: year,
            color:[]
        }
    }


    createHeaderBar = () =>{
        return(
            <View style={{
                height: 50,
                width: Constant.metric.screenWidth,
                backgroundColor: Constant.colors.Theme,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <TouchableOpacity
                    activeOpacity={1}
                    style={{marginLeft: 10}}
                    onPress={this.clickPrevious}>
                    <Image
                        style={{
                            height: 30,
                            width: 30
                        }}
                        source={require('../../imgs/Profile/profile_previous.png')}
                        resizeMode={'contain'}/>
                </TouchableOpacity>
                <Text style={{
                    fontSize: 20,
                    color: Constant.colors.whiteColor
                }}>
                    {this.state.year + '年' + this.state.month + '月'}
                </Text>
                <TouchableOpacity
                    activeOpacity={1}
                    style={{marginRight: 10}}
                    onPress={this.clickNext}>
                    <Image
                        style={{
                            height: 30,
                            width: 30
                        }}
                        source={require('../../imgs/Profile/profile_next.png')}
                        resizeMode={'contain'}/>
                </TouchableOpacity>
            </View>
        )
    }

    createDayBar = () =>{
        return(
            <View style={{
                height: 40,
                width: Constant.metric.screenWidth,
                alignItems: 'center',
                flexDirection: 'row',
            }}>
                {this.createLab()}
            </View>
        )
    }

    createLab = () => {
        var dateArray = ['一', '二', '三', '四', '五', '六', '七']
        var array = []
        for (var i = 1; i < 8; i++) {
            array.push(
                <View
                    key={i}
                    style={{
                        width: Constant.metric.screenWidth / 7,
                        height: 40,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: Constant.colors.Theme
                    }}>
                    <Text style={{
                        color: Constant.colors.whiteColor,
                        fontSize: 16
                    }}>
                        {dateArray[i - 1]}
                    </Text>
                </View>
            )
        }
        return array
    }

    creatContent = () =>{
        return(
            <FlatList
                data={this.state.dayData}
                numColumns={7}
                horizontal={false}
                extraData={this.state}
                renderItem={this.renderItem}
                keyExtractor={this.keyExtractor}/>
        )
    }

    render() {
        const {goBack} = this.props.navigation
        return (
            <View style={{flex: 1,backgroundColor:'white'}}>

                <SFHeader title={'档期'}
                          clickBack={() => goBack()}/>
                {this.createHeaderBar()}
                {this.createDayBar()}
                {this.creatContent()}
            </View>
        )
    }

    clickItem = (item, index) => {
        if (item == ' ') {
            return
        }
        var temp = this.state.color
        if (temp[index] == 1) {
            temp[index] = 0
        }
        else if (temp[index] == 0) {
            temp[index] = 1
        }
        this.setState({
            color:temp
        })
    }

    renderItem = ({item,index}) => {
        return (
            <TouchableOpacity
                activeOpacity={1}
                onPress={this.clickItem.bind(this, item, index)}>
                <View
                    style={{
                        width: Constant.metric.screenWidth / 7,
                        height: 40,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: this.state.color[index] == 1 ? Constant.colors.Theme : Constant.colors.whiteColor
                    }}>
                    <Text
                        style={{color: Constant.colors.contentOne}}>{item}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    keyExtractor = (item, index) => 'Zdate' + index



    getDaysOfMonth = (year, month) => {
        var day = new Date(year, month, 0)
        var dayCount = day.getDate()
        return dayCount
    }

    getFirstDay = (year, month) => {
        var day = new Date(year, month - 1)
        var dayCount = day.getDay()
        if (dayCount == 0) {
            dayCount = 7
        }
        return dayCount
    }

    componentDidMount() {
        var dayCount = this.getDaysOfMonth(year, 1)
        var dayIn = this.getFirstDay(year, 1)
        var temp = []
        var color = []
        for (var i = 1; i < dayIn; i++) {
            temp.push(' ')
            color.push(0)
        }
        for (var i = 1; i <= dayCount; i++) {
            temp.push(i)
            color.push(0)
        }
        this.setState({
            dayData: temp,
            color:color,
        })

    }

    clickNext = () => {
        index++
        if (index > 12) {
            index = 1
            year++
        }
        this.setState({
            month: index,
            year: year
        })
        var dayCount = this.getDaysOfMonth(year, index)
        var dayIn = this.getFirstDay(year, index)
        var temp = []
        var color = []
        for (var i = 1; i < dayIn; i++) {
            temp.push(' ')
            color.push(0)
        }
        for (var i = 1; i <= dayCount; i++) {
            temp.push(i)
            color.push(0)
        }
        this.setState({
            dayData: temp,
            color:color,
        })
    }

    clickPrevious = () => {
        index--
        if (index < 1) {
            index = 12
            year--
        }
        this.setState({
            month: index,
            year: year
        })
        var dayCount = this.getDaysOfMonth(year, index)
        var dayIn = this.getFirstDay(year, index)
        var temp = []
        for (var i = 1; i < dayIn; i++) {
            temp.push(' ')
        }
        for (var i = 1; i <= dayCount; i++) {
            temp.push(i)
        }
        this.setState({
            dayData: temp
        })
    }


}

