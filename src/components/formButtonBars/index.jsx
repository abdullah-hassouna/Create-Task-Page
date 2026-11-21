import { useFormikContext } from "formik";
import BellIcon from "../icons/bellIcon";
import SubmitIcon from "../icons/submitIcon";

/**
 * @param {{ "loading" : boolean, "saveDraftFunc": (values: any) => void }} _
 */
function FormButtonBars({ loading, saveDraftFunc }) {
  const { values } = useFormikContext();

  return (
    <div className="form-button-bars">
      <div>
        <BellIcon style={{ height: "15px" }} />
        <span>Interns will be notified immediately upon task creation.</span>
      </div>

      <div>
        <button
          type="button"
          onClick={() => {
            alert("Draft Saved");
            saveDraftFunc(values);
          }}
        >
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
