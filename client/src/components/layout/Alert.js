import React from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {removeAlert} from "../../actions/alert";



const Alert = ({alerts, removeAlert}) => {
  if(alerts !== null && alerts.length > 0){
    return(
      <div className={"alert-box"}>
        {
          alerts.map(alert => (
            <div key={alert.id} className={`alert alert-${alert.alertType}`}>
              {alert.msg}
              <div className={"close-button"} onClick={() => {removeAlert(alert.id)}}>
                X
              </div>
            </div>
          ))
        }
      </div>
    )
  }else{
    return null
  }
}

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  alerts : state.alert
})

export default connect(mapStateToProps, {removeAlert})(Alert)

