function Alert({ message, iconName, alertType, className }) {
  return (
    <div
      className={`alert alert-custom ${alertType} fade show mb-5 ${className}`}
      role="alert"
    >
      <div className="alert-icon">
        <ion-icon name={iconName}></ion-icon>
      </div>
      <div className="alert-text">{message}</div>
      <div className="alert-close">
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">
            <i className="ki ki-close"></i>
          </span>
        </button>
      </div>
    </div>
  );
}

export default Alert;
