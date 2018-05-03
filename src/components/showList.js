import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as showActions from '../actions/showActions';
import '../styles/show.css';
import PropTypes from 'prop-types';
import React from 'react';
import {render} from 'react-dom';
import InfiniteCalendar, {
  Calendar,
  withRange,
} from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
// import * as ICS from 'ics-js';
import AddToCalendar from 'react-add-to-calendar';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const CalendarWithRange = withRange(Calendar);

/*
 * React Component having all pages condn with basic state
 * State contains Pages Numbers, Family condn,
 * dates for calender selection and file variable (.ics)
*/

class showList extends React.Component {
    constructor(props) {
       super(props);
       this.state = {
          pages: ["start", "viewEvent", "newEvent"],
          pageLevel: 0,
          includeFamily: "0",
          savedEvents: {},
          dates: {
            start: new Date(2018, 3, 30),
            end: new Date(2018, 4, 2)
          },
          calenderOpen: false,
          selectedItem: 0,
          filePreparred: false
       }
       this.filterByDate = this.filterByDate.bind(this);
       this.moveToNextPage = this.moveToNextPage.bind(this);
       this.moveToPreviousPage = this.moveToPreviousPage.bind(this);
       this.calenderCloser = this.calenderCloser.bind(this);
       this.calenderOpener = this.calenderOpener.bind(this);
       this.carouselItemChange = this.carouselItemChange.bind(this);
       this.createEventFile = this.createEventFile.bind(this);
    }
    /*
     * function to check which carousel Image is dispalyed on Page 2.
     */
    carouselItemChange(itemSelected){
      this.setState({
        selectedItem: itemSelected
      })
    }
    /*
     * function to make calender visible
     * Also, attach a Event Listener for checking click events for hide it again.
     */
    calenderOpener(){
      this.setState({
        calenderOpen: true
      })
      document.addEventListener("click", this.calenderCloser)
    }
    /*
     * function to make calender hide.
     * Also, Event Listener removed.
     */
    calenderCloser(event){
      if(!document.getElementsByClassName('Cal__Container__root')[0].contains(event.target)){
        this.setState({
          calenderOpen: false
        })
        document.removeEventListener("click", this.calenderCloser)

      }
    }
    /*
     * Move to next Page
     * Fetching details of Events if on moving to 1st page.
    */
    moveToNextPage(){
      this.setState({pageLevel: this.state.pageLevel+1});
      //as asyn state is updating,so we use 0 page no here..would have used 1 actually..
      if(this.state.pageLevel == 0){
        this.props.showActions.fetchShow(this.state);
      }
    }
    /*
     * Move to previous Page
    */
    moveToPreviousPage(){
      this.setState({pageLevel: this.state.pageLevel-1});
    }
    /*
     * filter applied.
     * state is passed. For now only Date is uesd to filter.
    */
    filterByDate(){
      this.props.showActions.fetchShow(this.state);
    }
    /*
     * Events saved from carousel list to local state list.
    */
    addToEvents(event){
      let add = this.state.savedEvents;
      add[event.id] = event;
      this.setState({savedEvents: add})
    }
    /*
     * Events removed from state list.
    */
    removeFromEvents(event){
      let add = this.state.savedEvents;
      delete add[event.id];
      this.setState({savedEvents: add})
    }
    /*
     * state list saved in .ics file for import to calender.
    */
    createEventFile(){
      let icsMSG = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Our Company//NONSGML v1.0//EN\n"
      Object.keys(this.state.savedEvents).map(eventId => {
        let item = this.state.savedEvents[eventId];
        console.log("icsMSG" ,item);
        icsMSG += "BEGIN:VEVENT\nUID:me@google.com\nDTSTAMP:20120315T170000Z\nATTENDEE;CN=My Self ;RSVP=TRUE:MAILTO:me@gmail.com\nORGANIZER;CN=Me:MAILTO::me@gmail.com\nDTSTART:" +"20120315T170000Z" +"\nDTEND:" + "20120315T170000Z"+"\nLOCATION:" + "India"+ "\nSUMMARY:Our Meeting Office\nEND:VEVENT\n"
      })
      icsMSG += "END:VCALENDAR";
      console.log("icsMSG11", icsMSG);
      var a = document.getElementById("a");
      var file = new Blob([icsMSG], {type: "text/plain"});
      a.href = URL.createObjectURL(file);
      a.download = "down.ics";
      this.setState({filePreparred: true});
    }
    /*
     * Events saved in list are being show as a cart to finilize event files.
     * .ics file can be saved of all Events
     * Also Individual events can be saved.
    */
    renderTable(item) {
      let sDate = new Date(item.sales.public.startDateTime),
          eDate = new Date(item.sales.public.endDateTime),
          todayDate = new Date();
      let displaysDate = sDate.getFullYear() + "-" + sDate.getMonth() + "-" + sDate.getDate(),
          displayeDate = eDate.getFullYear() + "-" + eDate.getMonth() + "-" + eDate.getDate();
      let left = window.innerWidth/3;
      let buttonBuy;
        if(sDate > todayDate){
          buttonBuy = "sales-not-start";
        }else if(eDate > todayDate){
          buttonBuy = "sales-start";
        }else{
          buttonBuy = "sales-end";
        }
        let event = {
          title: item.name,
          description: item.info,
          location: item._embedded ? item._embedded.venues[0].name : item.place[0].address,
          startTime: item.sales.public.startDateTime,
          endTime: item.sales.public.startDateTime
        };
        return <div className="events-box" key={item.id}>
            <div className="event-image col-md-2">
              <img className="img-circle img-responsive " alt={item.name} src={item.images[2].url} />
            </div>
            <div className="event-details" style={{padding: "10px"}}>
              <div className="event-name">
               <h4 style={{color:"#f7786b"}}>Event Information:</h4>
                <label style={{fontSize:"20px"}}>{item.name}</label>
                <div className="event-venue">
                   <h4 style={{color:"#f7786b", display: "inline-block"}}>Venue:</h4>
                  {
                    item._embedded ?
                      <label onClick={()=>window.open(item._embedded.venues[0].url, '_target')}
                         className="event-address">{"  " + item._embedded.venues[0].name}</label>
                      :
                      <label className="event-address">{"  " + item.place[0].address}</label>
                  }
                  </div>
                  <div className="event-dates">Tickets publically available from {displaysDate} to {displayeDate}</div>
              </div>
              <div className="button-space">
                <div className={"btn " + buttonBuy} onClick={() => window.open(item.url, '_target')}>Buy</div>
                {this.state.savedEvents[item.id] ?
                  <div className="btn" onClick={this.removeFromEvents.bind(this, item)}>Remove</div>
                :
                  <div className="btn btn-info event-adder" style={{marginTop:"10px",marginBottom:"5px"}}onClick={this.addToEvents.bind(this, item)}>Save to list</div>
                }
                <AddToCalendar event={event}/>
              </div>
            </div>
        </div>;
    }
    /*
     * Events on 2nd page.
     * carousel elements saved as children here.
    */
    renderData(item) {
      let sDate = new Date(item.sales.public.startDateTime),
          eDate = new Date(item.sales.public.endDateTime),
          todayDate = new Date();
      let displaysDate = sDate.getFullYear() + "-" + sDate.getMonth() + "-" + sDate.getDate(),
          displayeDate = eDate.getFullYear() + "-" + eDate.getMonth() + "-" + eDate.getDate();
      let left = window.innerWidth/3;
      let buttonBuy;
        if(sDate > todayDate){
          buttonBuy = "sales-not-start";
        }else if(eDate > todayDate){
          buttonBuy = "sales-start";
        }else{
          buttonBuy = "sales-end";
        }
        let event = {
          title: item.name,
          description: item.info,
          location: item._embedded ? item._embedded.venues[0].name : item.place[0].address,
          startTime: item.sales.public.startDateTime,
          endTime: item.sales.public.startDateTime
        };
        return <div>
                  <img src={item.images[2].url} />
                  <p className="legend">{item.name}</p>
              </div>
    }
    /*
     * Family [Yes, No, Only] can be selected from Page 1.
    */
    familyOptionChange(value) {
      this.setState({
        includeFamily: value
      });
    }
    render() {
      if(!this.props.show){
          return (
              <div style={{marginTop: "18%", marginLeft: "50%"}}>
                  Loading show tickets...
              </div>
          )
      }else{
        let data = this.props.show._embedded ? this.props.show._embedded.events : [],
            height = window.innerHeight - 100,
            fullHeight = window.innerHeight,
            fullWidth = window.innerWidth - 20,
            width = window.innerWidth/2 - 20,
            width1 = window.innerWidth/3,
            width2 = window.innerWidth - 120,
            pageDiv = [];

          if(this.state.pageLevel === 0){
            pageDiv.push(<div className="container" style={{textAlign:"center", height: fullHeight, width: fullWidth}}>
                        <div className="col-md-8 col-md-offset-2" style={{backgroundColor:"#f9f9f9",padding:"10px",marginTop:"20px",paddingBottom:"40px"}}>
                        <h2 className="text-info">Plan your day!</h2>
                        <h4 className="text-success" style={{marginTop:"5px"}}>Who are you?</h4>
                        <div class="row">
                          <div class="who-image col-md-4 col-sm-12" style={{cursor: "pointer"}} onClick={this.familyOptionChange.bind(this, "0")} >
                              <img style={{border: (this.state.includeFamily =="0" ? "1px solid green" : "") }}  class="image img-circle"  src="friends.png" />
                              <div class="middle">
                                <div class="text">Friends</div>
                              </div>
                          </div>
                          <div class="who-image col-md-4 col-sm-12" style={{cursor: "pointer"}} onClick={this.familyOptionChange.bind(this, "1")}>
                              <img  style={{border: (this.state.includeFamily =="1" ? "1px solid green" : "") }} class="image img-circle"  src="family.png"  />
                              <div class="middle">
                                <div class="text">Family</div>
                              </div>
                          </div>
                          <div class="who-image col-md-4 col-sm-12" style={{cursor: "pointer"}} onClick={this.familyOptionChange.bind(this, "2")}>
                              <img  style={{border: (this.state.includeFamily =="2" ? "1px solid green" : "") }} class="image img-circle"   src="single.png"  />
                              <div class="middle">
                                <div class="text">Single</div>
                              </div>
                          </div>
                          <div class="who-image col-md-4 col-sm-12" style={{cursor: "pointer"}} onClick={this.familyOptionChange.bind(this, "3")}>
                              <img  style={{border: (this.state.includeFamily =="3" ? "1px solid green" : "") }} class="image img-circle"  src="couple.png"  />
                              <div class="middle">
                                <div class="text">Couple</div>
                              </div>
                        </div>
                      </div>
                            </div>
                        </div>)
          }else if(this.state.pageLevel === 1){
          /*
           * Carousel List to show different Events
           * Calender option for filter to update event list.
          */
            pageDiv.push(
              <div style={{textAlign:"center", height: fullHeight, width: fullWidth, padding: "26px"}}>
                <div>
                <div>
                {
                data.length ? <Carousel showArrows={true} selectedItem={this.state.selectedItem} onChange={this.carouselItemChange}>{data.map((item, index) => {
                  let event = {
                    title: item.name,
                    description: item.info,
                    location: item._embedded ? item._embedded.venues[0].name : item.place[0].address,
                    startTime: item.sales.public.startDateTime,
                    endTime: item.sales.public.startDateTime
                  };
                        return (
                          <div>
                              <img src={item.images[2].url}/>
                              <p className="legend">{item.name}

                              <div style={{display: "inline", marginLeft: "15px"}}>
                                <div style={{margin: "0px 15px"}} className="btn btn-primary" onClick={() => window.open(item.url, '_target')}>Buy</div>
                                {this.state.savedEvents[item.id] ?
                                  <div style={{margin: "0px 15px"}} className="btn btn-primary" onClick={this.removeFromEvents.bind(this, item)}>Remove</div>
                                :
                                  <div style={{margin: "0px 15px"}} className="btn btn-info "onClick={this.addToEvents.bind(this, item)}>Save to list</div>
                                }
                                <div style={{margin: "0px 15px", display: "inline"}} >
                                <AddToCalendar event={event}/>
                                </div>
                              </div>

                              </p>
                          </div>
                        );
                    })
                  }</Carousel>
                  :
                  <div class="loader"></div>
                }
                </div>
                <div className="btn btn-warning" style={{position: "absolute", top: "0px", left: "0px"}} onClick={this.calenderOpener}>Change Date </div>
                { this.state.calenderOpen &&
                     <div className="calender-adder" style={{ height: "96%", overflow: "hidden",position: "absolute", top: "20px"}}>
                     <div style={{opacity: "0.3",    backgroundColor: "black", top: "0px", left: "0px", position: "fixed",  backgroundCcolor: "black",opacity: "0.5", width: fullWidth, height: fullHeight}}></div>
                      <InfiniteCalendar
                        Component={CalendarWithRange}
                        selected={this.state.dates}
                        locale={{
                          headerFormat: 'MMM Do',
                        }}
                        onSelect={(d) => {this.setState({dates : {start: d.start, end: d.end}}); }}
                      />
                  </div>
                }
                </div>
                <div style={{left: width, position: "absolute", bottom: "10px"}} className="btn btn-primary" onClick={this.filterByDate}>Filter events</div>
              </div>
            )
          }
          else if(this.state.pageLevel === 2){
          /*
           * Render cart table to show selected events.
          */
            pageDiv.push(<div style={{textAlign:"center", height: fullHeight, width: fullWidth, padding: "26px"}}>
                        <div style={{textAlign: "center"}}><h2>want to mail saved event calender?</h2></div>
                        <div style={{flex:"1", height: height, overflow: "auto", margin: "5px"}}>{
                            Object.keys(this.state.savedEvents).length ? Object.keys(this.state.savedEvents).map((item, index) => {
                                return (
                                    this.renderTable(this.state.savedEvents[item])
                                );
                            })
                            :
                            <div>No Data available right now</div>
                        }</div>
                        <div style={{left: width1, position: "absolute", bottom: "10px", width: "150px"}} className={"btn btn-primary "  + (!this.state.filePreparred ? "" : "disabled")} onClick={this.createEventFile.bind(this)}>Prepare Event file</div>

                          <div style={{left: width, position: "absolute", bottom: "10px", width: "150px"}} className={"btn btn-primary " + (this.state.filePreparred ? "" : "disabled")}><a style={{color: "white"}} href="" id="a">Import Events</a></div>

                        </div>)
          }
          /*
           * Previous Page button to move to last page.
          */
          if(this.state.pageLevel != 0){
            pageDiv.push(<div style={{position: "absolute", left: "22px", bottom: "10px"}} className="btn btn-primary" onClick={this.moveToPreviousPage}>Previous Page</div>);
          }
          /*
           * Next Page button to move to next page.
          */
          if(this.state.pageLevel < this.state.pages.length-1){
            pageDiv.push(<div style={{position: "absolute", left: width2, bottom: "10px"}} className="btn btn-primary" onClick={this.moveToNextPage}>Next Page</div>)
          }
          return pageDiv;
        }
    }
}

showList.propTypes = {
    showActions: PropTypes.object,
    show: PropTypes.array
};

function mapStateToProps(state) {
    return {
        show: state.show
    };
}

function mapDispatchToProps(dispatch) {
    return {
       showActions: bindActionCreators(showActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(showList);
