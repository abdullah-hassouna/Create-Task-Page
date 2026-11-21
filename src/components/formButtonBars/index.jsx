import BellIcon from "../icons/bellIcon";
import SubmitIcon from "../icons/submitIcon";

/**
 * @param {{ "loading" : boolean }} _
 */
function FormButtonBars({ loading }) {
  return (
    <div className="form-button-bars">
      <div>
        <BellIcon style={{ height: "15px" }} />
        <span>Interns will be notified immediately upon task creation.</span>
      </div>

      <div>
        <button>
          <span>Cancel / Save Draft</span>
        </button>
        <button disabled={loading} type="submit">
          <SubmitIcon />
          <span>{loading ? "Submitting..." : "Create Task"}</span>
        </button>
      </div>
    </div>
  );
}

export default FormButtonBars;
