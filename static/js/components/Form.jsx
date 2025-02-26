const Form = function () {
  const [errors, setErrors] = React.useState({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [name, setName] = React.useState("");
  const [age, setAge] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [hometown, setHometown] = React.useState("");

  const [nameError, setNameError] = React.useState("");
  const [ageError, setAgeError] = React.useState("");
  const [titleError, setTitleError] = React.useState("");
  const [hometownError, setHometownError] = React.useState("");

 let newErrors = {};
  const history = ReactRouterDOM.useHistory();

  const validateForm = () => {
    newErrors = {};
        setNameError('')
        setAgeError('')
        setTitleError('')
        setHometownError('')
    if (!name.trim()) {
      newErrors.name = "Name is required";
      setNameError('error')
    }  
    if (!age.trim()) {
      newErrors.age = "Age is required";
      setAgeError('error')
    }
     
    if (!title.trim()) {
      newErrors.title = "Title is required";
      setTitleError('error')
    }
    if (!hometown.trim()) {
      newErrors.hometown = "Title is required";
      setHometownError('error')
    }  
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    const formDataObj = {
        'name': name,
        'age': age,
        'title': title,
        'hometown': hometown
    }
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      try {
        const response = await axios.post("/api/submit", formDataObj);
        if (response.data.success) {
          history.push({
            pathname: "/confirmation",
            state: { name, age, title, hometown },
          });
        }
      } catch (error) {
        setErrors({ submit: "Failed to submit form. Please try again." });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="main">
      <div className="card main">
        <h2 className="card-title text-center mb-4">New Contact Info</h2>
        <div className="divider"></div>
        <form onSubmit={handleSubmit}>
          <div className={nameError}>
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            /> 
            
            {nameError.length > 0 ? `Please provie a valid input`: ``}
            {JSON.stringify(newErrors.name)}
          </div>
          <div className={ageError}>
            <label htmlFor="name" className="form-label">
              Age
            </label>
            <input
              type="text"
              id="age"
              name="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            {ageError.length > 0 ? `Please provie a valid input`: ``}
          </div>
          <div className={titleError}>
            <label htmlFor="name" className="form-label">
              Title
            </label>
            <select
              name="title"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            >
              <option value="">-- select ---</option>
              <option value="Mr. ">Mr.</option>
              <option value="Ms. ">Ms.</option>
              <option value="Mrs. ">Mrs.</option>
              <option value="Dr. ">Dr.</option>
              <option value="Senator ">Senator</option>
              <option value="Captain ">Capt.</option>
              <option value="Lord ">Lord </option>
            </select>
            {nameError.length > 0 ? `Please provie a valid input`: ``}
          </div>
          <div className={hometownError}>
            <label htmlFor="name" className="form-label">
              Hometown
            </label>
            <input
              type="text"
              id="hometown"
              name="hometown"
              value={hometown}
              onChange={(e) => setHometown(e.target.value)}
            />
            {hometownError.length > 0 ? `Please provie a valid input`: ``}
          </div>

          {errors.submit && (
            <div className="alert alert-danger">{errors.submit}</div>
          )}
          <div className="divider"></div>
          <button type="submit" className="primary" disabled={isSubmitting}>
            {isSubmitting.length > 0 ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

// Make Form available globally
window.Form = Form;