import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getSellerProfile } from '../../Redux/actions/seller';
import createHistory from 'history/createBrowserHistory';
import StoreForm from '../StoreForm/StoreForm'

export const history = createHistory();


class Dashboard extends Component {

    componentWillMount() {
        if (!this.props.auth.isAuthenticated) {
            this.props.history.push('/login');
        }
        this.props.getSellerProfile(this.props.auth.user.email);
    }



    render() {
        const { isAuthenticated, user } = this.props.auth;


        return (
            <div className="container">
                {user.email}
                <br />
                name:
                {this.props.profile.name}
                <br />
                {this.props.profile.type}
                <br />
                <div className="container">
                <StoreForm />
                </div>


                Dashboard Component
            </div>
        );
    }
}

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.user.profile
})

export default connect(mapStateToProps, { getSellerProfile })(withRouter(Dashboard));