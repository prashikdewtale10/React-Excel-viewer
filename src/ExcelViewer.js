import React, { Component } from 'react'
import { OutTable, ExcelRenderer } from 'react-excel-renderer';
import { Col, Input, InputGroup, FormGroup, Label, Button, Fade, FormFeedback, Container, Card } from 'reactstrap'

export class ExcelViewer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isOPen: false,
            dataLoaded: false,
            isFormInvalid: false,
            rows: null,
            cols: null,
            uploadedFileName: ''

        }
        this.fileHandler = this.fileHandler.bind(this);
        this.toggle = this.toggle.bind(this);
        this.openFileBrowser = this.openFileBrowser.bind(this);
        this.renderFile = this.renderFile.bind(this);
        this.fileInput = React.createRef();
    }

    renderFile = (fileObj) => {
        ExcelRenderer(fileObj, (err, res) => {
            if (err) {
                console.log(err)
            } else {
                this.setState({
                    dataLoaded: true,
                    cols: res.cols,
                    rows: res.rows
                })
                console.log(`data=>`, res.cols, res.rows)
            }
        });
    }

    fileHandler = (event) => {
        if (event.target.files.length) {
            let fileObj = event.target.files[0];
            let fileName = fileObj.name;

            //checking file system
            if (fileName.slice(fileName.lastIndexOf('.') + 1) === "xlsx") {
                this.setState({
                    uploadedFileName: fileName,
                    isFormInvalid: false
                });
                this.renderFile(fileObj)
            } else {
                alert("Invalid File Format")
                this.setState({
                    isFormInvalid: true,
                    uploadedFileName: ''
                })
            }

        }

    }

    toggle() {
        this.setState({
            isOPen: !this.state.isOPen
        });
    }

    openFileBrowser = () => {
        this.fileInput.current.click();
    }

    render() {
        return (
            <div>
                <div>

                </div>
                <Container>
                    <form>
                        <FormGroup row className="bord">
                            <Label for="exampleFile" xs={6} sm={4} lg={2} size="lg"><h1 className='heading'>React Excel Viewer</h1></Label>
                            <Col xs={4} sm={8} lg={10} >

                                <InputGroup >
                                
                                    
                                    <InputGroup className="fle" >
                                    <Input type="text" className="form-control" value={this.state.uploadedFileName} readOnly invalid={this.state.isFormInvalid}  className="text_inp"/>
                                        <Button color="info" className='butto' onClick={this.openFileBrowser.bind(this)}><i className="cui-file"></i><i className="fas fa-file-excel"></i></Button>
                                        <input type="file" hidden onChange={this.fileHandler.bind(this)} ref={this.fileInput} onClick={(event) => { event.target.value = null }} style={{ "padding": "15px" }} />

                                    </InputGroup>
                                    
                                    <FormFeedback>
                                        <Fade in={this.state.isFormInvalid} tag="h6" style={{ fontStyle: "italic" }}>
                                            {this.state.isFormInvalid ?"Please select a .xlsx file only ! " :" "}
                                        </Fade>
                                    </FormFeedback>
                                </InputGroup>
                            </Col>
                        </FormGroup>
                    </form>

                    {this.state.dataLoaded &&
                        <div>
                            <Card body outline color="secondary" className="restrict-card">

                                <OutTable data={this.state.rows} columns={this.state.cols} tableClassName="ExcelTable2007" tableHeaderRowClass="heading" />

                            </Card>
                        </div>}
                </Container>
            </div>
        )
    }
}

export default ExcelViewer
