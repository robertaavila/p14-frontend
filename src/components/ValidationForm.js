import React from 'react';
import './ValidationForm.css';
import 'bulma/css/bulma.css'

export default class ValidateForm extends React.Component {
    render() {
        return (
            <div className="column Validate">
                <div className="column is-centered" style={{backgroundColor:"#FFF"}}>
                    <div className="container">
                        <div className="field">
                            <label className="label">Name</label>
                            <div className="control">
                                <input className="input" type="text" placeholder="Text input"></input>
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Username</label>
                            <div className="control has-icons-left has-icons-right">
                                <input className="input is-success" type="text" placeholder="Text input"
                                       value="bulma"></input>
                                <span className="icon is-small is-left">
                              <i className="fas fa-user"></i>
                            </span>
                                <span className="icon is-small is-right">
                              <i className="fas fa-check"></i>
                            </span>
                            </div>
                            <p className="help is-success">This username is available</p>
                        </div>

                        <div className="field">
                            <label className="label">Email</label>
                            <div className="control has-icons-left has-icons-right">
                                <input className="input is-danger" type="email" placeholder="Email input"
                                       value="hello@"></input>
                                <span className="icon is-small is-left">
                              <i className="fas fa-envelope"></i>
                            </span>
                                <span className="icon is-small is-right">
                              <i className="fas fa-exclamation-triangle"></i>
                            </span>
                            </div>
                            <p className="help is-danger">This email is invalid</p>
                        </div>

                        <div className="field">
                            <label className="label">Subject</label>
                            <div className="control">
                                <div className="select">
                                    <select>
                                        <option>Select dropdown</option>
                                        <option>With options</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="file has-name">
                                <label className="file-label">
                                    <input className="file-input" type="file" name="resume"></input>
                                    <span className="file-cta">
                                      <span className="file-icon">
                                        <i className="fas fa-upload"></i>
                                      </span>
                                      <span className="file-label">
                                        Choose a file…
                                      </span>
                                    </span>
                                    <span className="file-name">
                                      Screen Shot 2017-07-29 at 15.54.25.png
                                    </span>
                                </label>
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Message</label>
                            <div className="control">
                                <textarea className="textarea" placeholder="Textarea"></textarea>
                            </div>
                        </div>

                        <div className="field">
                            <div className="control">
                                <label className="checkbox">
                                    <input type="checkbox"></input>
                                    I agree to the <a href="#">terms and conditions</a>
                                </label>
                            </div>
                        </div>

                        <div className="field">
                            <div className="control">
                                <label className="radio">
                                    <input type="radio" name="question"></input>
                                    Yes
                                </label>
                                <label className="radio">
                                    <input type="radio" name="question"></input>
                                    No
                                </label>
                            </div>
                        </div>

                        <div className="field is-grouped">
                            <div className="control">
                                <button className="button is-link">Submit</button>
                            </div>
                            <div className="control">
                                <button className="button is-text">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
