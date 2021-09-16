import React, { Component } from 'react'

const WorkspaceContext = React.createContext()

class WorkspaceProvider extends Component {
  state = {
    workspaceList: [],
    trash: [],
    detailWorkspace: {},
    detailSpace: {},
    workspaceElements: [],
  }

  addNewWorkspace = (newItem) => {
    const oldList = this.state.workspaceList
    this.setState({
      workspaceList: [...oldList, newItem],
    })
  }
  editWorkspace = (id, newTitle, newThumbnail) => {
    const oldList = this.state.workspaceList
    const selectedItem = oldList.find((item) => item.id === id)
    const index = oldList.indexOf(selectedItem)
    const item = oldList[index]
    item.title = newTitle
    item.image = newThumbnail
    this.setState(() => {
      return {
        workspaceList: oldList,
      }
    })
  }
  deleteWorkspace = (id) => {
    let oldList = this.state.workspaceList
    const selectedItem = oldList.find((item) => item.id === id)
    oldList = oldList.filter((element) => element.id !== id)
    this.setState(() => {
      return {
        workspaceList: oldList,
        trash: [...this.state.trash, selectedItem],
      }
    })
  }
  handleDetail = (id) => {
    const detailItem = this.state.workspaceList.find((item) => item.id === id)
    this.setState(() => {
      return { detailWorkspace: detailItem }
    })
  }

  handleDetailSpace = (id) => {
    const detailElement = this.state.workspaceElements.find(
      (item) => item.id === id
    )
    this.setState(() => {
      return { detailSpace: detailElement }
    })
  }

  addNewSpace = (item) => {
    const oldList = [...this.state.workspaceElements]
    this.setState({ workspaceElements: [...oldList, item] })
  }

  addBook = (book, id, key) => {
    const oldList = [...this.state.workspaceElements]
    let element = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )
    const { favourite } = book
    if (favourite) {
      element.favouriteBooks = element.favouriteBooks || []
      element.favouriteBooks = [...element.favouriteBooks, book]
    } else {
      element.bookShelf = element.bookShelf || []
      element.bookShelf = [...element.bookShelf, book]
    }
    this.setState(() => {
      return { workspaceElements: oldList }
    })
  }

  deleteBook = (favourite, bookID, id, key) => {
    const oldList = [...this.state.workspaceElements]
    let element = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )
    if (favourite) {
      const newBookList = element.favouriteBooks.filter(
        (book) => book.id !== bookID
      )
      element.favouriteBooks = newBookList
    } else {
      const newBookList = element.bookShelf.filter((book) => book.id !== bookID)
      element.bookShelf = newBookList
    }
    this.setState(() => {
      return { workspaceElements: oldList }
    })
  }

  addNewSubject = (id, key, subject) => {
    const oldList = [...this.state.workspaceElements]
    let element = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )
    element.subjects = element.subjects || []
    element.subjects = [...element.subjects, subject]
    this.setState(() => {
      return { workspaceElements: oldList }
    })
  }

  editSubject = (id, key, subject) => {
    const oldList = [...this.state.workspaceElements]
    let element = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )
    const subjectToEdit = element.subjects.find(
      (item) => item.subjectID === subject.subjectID
    )
    const index = element.subjects.indexOf(subjectToEdit)
    element.subjects[index] = { ...subject }

    this.setState(() => {
      return { workspaceElements: oldList }
    })
  }

  render() {
    return (
      <WorkspaceContext.Provider
        value={{
          ...this.state,
          addNewWorkspace: this.addNewWorkspace,
          editWorkspace: this.editWorkspace,
          deleteWorkspace: this.deleteWorkspace,
          handleDetail: this.handleDetail,
          addNewSpace: this.addNewSpace,
          handleDetailSpace: this.handleDetailSpace,
          addBook: this.addBook,
          deleteBook: this.deleteBook,
          addNewSubject: this.addNewSubject,
          editSubject: this.editSubject,
        }}
      >
        {this.props.children}
      </WorkspaceContext.Provider>
    )
  }
}

const WorkspaceConsumer = WorkspaceContext.Consumer

export { WorkspaceProvider, WorkspaceConsumer }
