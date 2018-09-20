import SignupForm from './SignupForm';
import { userLogin } from '../../actions';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    console.log("mapping", state);
    return {
        user: state.user,
        token: state.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onUserSignup: (user, token) => {
            console.log('dispatching', user, token, userLogin);
            dispatch(userLogin(user, token));
        }
    }
}
// const SignupGql = graphql(SignupForm);
const Signup = connect(
    mapStateToProps,
    mapDispatchToProps
)(SignupForm);

export default Signup;