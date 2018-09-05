import { connect } from "react-redux";
import Calendar from "./Calendar";
import { getCurrentFormattedDate } from "../../selectors/mainSelectors";
import { changeDate } from "../../actions/mainActions";

const mapStateToProps = state => ({
  currDate: getCurrentFormattedDate(state)
});

const mapDispatchToProps = {
  increaseDate: changeDate.increase,
  decreaseDate: changeDate.decrease,
  setCurrent: changeDate.setCurrent
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Calendar);
