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

  deleteSpace = (key) => {
    const oldList = [...this.state.workspaceElements]
    const newList = oldList.filter((item) => item.id !== key)
    this.setState({ workspaceElements: newList })
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

  addNewClub = (id, key, club) => {
    const oldList = [...this.state.workspaceElements]
    let element = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )
    element.clubs = element.clubs || []
    element.clubs = [...element.clubs, club]
    this.setState(() => {
      return { workspaceElements: oldList }
    })
  }

  deleteClub = (id, key, clubId) => {
    const oldList = [...this.state.workspaceElements]
    let element = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )
    const newClubList = element.clubs.filter((item) => item.id !== clubId)
    element.clubs = newClubList
    this.setState(() => {
      return { workspaceElements: oldList }
    })
  }

  handleClubInfo = (id, key, clubId, info) => {
    const oldList = [...this.state.workspaceElements]
    let element = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )
    let clubElement = element.clubs.find((item) => item.id === clubId)
    clubElement.basicInfo = clubElement.basicInfo || {}
    clubElement.basicInfo = {
      createdBy: info.createdBy,
      members: info.members,
      mission: info.mission,
    }
    this.setState(() => {
      return { workspaceElements: oldList }
    })
  }

  addNewResource = (id, key, clubId, resource) => {
    const oldList = [...this.state.workspaceElements]
    let element = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )
    let clubElement = element.clubs.find((item) => item.id === clubId)
    clubElement.resources = clubElement.resources || []
    clubElement.resources = [...clubElement.resources, resource]
    this.setState(() => {
      return { workspaceElements: oldList }
    })
  }

  addTask = (id, key, clubId, resourceId, task) => {
    const oldList = [...this.state.workspaceElements]
    let element = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )
    let clubElement = element.clubs.find((item) => item.id === clubId)
    let resourceElement = clubElement.resources.find(
      (item) => item.id === resourceId
    )
    resourceElement.tasks = resourceElement.tasks || []
    resourceElement.tasks = [...resourceElement.tasks, task]
    this.setState(() => {
      return { workspaceElements: oldList }
    })
  }

  taskManipulation = (id, key, clubId, resourceId, taskId) => {
    const oldList = [...this.state.workspaceElements]
    let element = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )
    let clubElement = element.clubs.find((item) => item.id === clubId)
    let resourceElement = clubElement.resources.find(
      (item) => item.id === resourceId
    )
    let taskElement = resourceElement.tasks.find((item) => item.id === taskId)
    taskElement.completed = !taskElement.completed
    this.setState(() => {
      return { workspaceElements: oldList }
    })
  }

  deleteTask = (id, key, clubId, resourceId, taskId) => {
    const oldList = [...this.state.workspaceElements]
    let element = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )
    let clubElement = element.clubs.find((item) => item.id === clubId)
    let resourceElement = clubElement.resources.find(
      (item) => item.id === resourceId
    )
    const newTaskList = resourceElement.tasks.filter(
      (item) => item.id !== taskId
    )
    resourceElement.tasks = newTaskList
    this.setState(() => {
      return { workspaceElements: oldList }
    })
  }

  editTask = (id, key, clubId, resourceId, taskId, task) => {
    const oldList = [...this.state.workspaceElements]
    let element = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )
    let clubElement = element.clubs.find((item) => item.id === clubId)
    let resourceElement = clubElement.resources.find(
      (item) => item.id === resourceId
    )
    let taskElement = resourceElement.tasks.find((item) => item.id === taskId)

    taskElement.title = task.title
    taskElement.createdOn = task.createdOn
    taskElement.dueDate = task.dueDate
    taskElement.description = task.description

    this.setState(() => {
      return { workspaceElements: oldList }
    })
  }

  addNewMeeting = (id, key, clubId, resourceId, meeting) => {
    const oldList = [...this.state.workspaceElements]
    let element = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )
    let clubElement = element.clubs.find((item) => item.id === clubId)
    let resourceElement = clubElement.resources.find(
      (item) => item.id === resourceId
    )
    resourceElement.meetings = resourceElement.meetings || []
    resourceElement.meetings = [...resourceElement.meetings, meeting]
    this.setState(() => {
      return { workspaceElements: oldList }
    })
  }

  editMeeting = (id, key, clubId, resourceId, meetingId, newMeeting) => {
    const oldList = [...this.state.workspaceElements]
    let element = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )
    let clubElement = element.clubs.find((item) => item.id === clubId)
    let resourceElement = clubElement.resources.find(
      (item) => item.id === resourceId
    )
    let meetingElement = resourceElement.meetings.find(
      (item) => item.id === meetingId
    )
    console.log('meetingelement', meetingElement)
    console.log('incoming meeting', newMeeting)
    meetingElement.title = newMeeting.title
    meetingElement.createdOn = newMeeting.createdOn
    meetingElement.createdBy = newMeeting.createdBy
    meetingElement.type = newMeeting.type
    meetingElement.participants = newMeeting.participants
    meetingElement.links = newMeeting.links
    meetingElement.note = newMeeting.note

    this.setState(() => {
      return { workspaceElements: oldList }
    })
  }

  deleteMeeting = (id, key, clubId, resourceId, meetingId) => {
    const oldList = [...this.state.workspaceElements]
    let element = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )
    let clubElement = element.clubs.find((item) => item.id === clubId)
    let resourceElement = clubElement.resources.find(
      (item) => item.id === resourceId
    )
    const newMeetingsList = resourceElement.meetings.filter(
      (item) => item.id !== meetingId
    )
    resourceElement.meetings = newMeetingsList
    this.setState(() => {
      return { workspaceElements: oldList }
    })
  }

  addNewIdea = (id, key, clubId, resourceId, idea) => {
    const oldList = [...this.state.workspaceElements]
    let element = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )
    let clubElement = element.clubs.find((item) => item.id === clubId)
    let resourceElement = clubElement.resources.find(
      (item) => item.id === resourceId
    )
    resourceElement.ideas = resourceElement.ideas || []
    resourceElement.ideas = [...resourceElement.ideas, idea]
    this.setState(() => {
      return { workspaceElements: oldList }
    })
  }

  editIdea = (id, key, clubId, resourceId, ideaId, newIdea) => {
    const oldList = [...this.state.workspaceElements]
    let element = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )
    let clubElement = element.clubs.find((item) => item.id === clubId)
    let resourceElement = clubElement.resources.find(
      (item) => item.id === resourceId
    )
    let ideaElement = resourceElement.ideas.find((item) => item.id === ideaId)
    ideaElement.title = newIdea.title
    ideaElement.createdOn = newIdea.createdOn
    ideaElement.createdBy = newIdea.createdBy
    ideaElement.type = newIdea.type
    ideaElement.links = newIdea.links
    ideaElement.note = newIdea.note

    this.setState(() => {
      return { workspaceElements: oldList }
    })
  }

  deleteIdea = (id, key, clubId, resourceId, ideaId) => {
    const oldList = [...this.state.workspaceElements]
    let element = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )
    let clubElement = element.clubs.find((item) => item.id === clubId)
    let resourceElement = clubElement.resources.find(
      (item) => item.id === resourceId
    )
    const newIdeasList = resourceElement.ideas.filter(
      (item) => item.id !== ideaId
    )
    resourceElement.ideas = newIdeasList
    this.setState(() => {
      return { workspaceElements: oldList }
    })
  }

  addNewFinance = (id, key, clubId, resourceId, finance) => {
    const oldList = [...this.state.workspaceElements]
    let element = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )
    let clubElement = element.clubs.find((item) => item.id === clubId)
    let resourceElement = clubElement.resources.find(
      (item) => item.id === resourceId
    )
    resourceElement.finances = resourceElement.finances || []
    resourceElement.finances = [...resourceElement.finances, finance]
    this.setState(() => {
      return { workspaceElements: oldList }
    })
  }

  editFinance = (id, key, clubId, resourceId, financeId, newFinance) => {
    const oldList = [...this.state.workspaceElements]
    let element = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )
    let clubElement = element.clubs.find((item) => item.id === clubId)
    let resourceElement = clubElement.resources.find(
      (item) => item.id === resourceId
    )
    let financeElement = resourceElement.finances.find(
      (item) => item.id === financeId
    )
    financeElement.title = newFinance.title
    financeElement.createdOn = newFinance.createdOn
    financeElement.createdBy = newFinance.createdBy
    financeElement.company = newFinance.company
    financeElement.financer = newFinance.financer
    financeElement.personalDetails = newFinance.personalDetails
    financeElement.links = newFinance.links

    this.setState(() => {
      return { workspaceElements: oldList }
    })
  }

  deleteFinance = (id, key, clubId, resourceId, financeId) => {
    const oldList = [...this.state.workspaceElements]
    let element = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )
    let clubElement = element.clubs.find((item) => item.id === clubId)
    let resourceElement = clubElement.resources.find(
      (item) => item.id === resourceId
    )
    const newFinancesList = resourceElement.finances.filter(
      (item) => item.id !== financeId
    )
    resourceElement.finances = newFinancesList
    this.setState(() => {
      return { workspaceElements: oldList }
    })
  }

  addNewContact = (id, key, clubId, resourceId, contact) => {
    const oldList = [...this.state.workspaceElements]
    let element = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )
    let clubElement = element.clubs.find((item) => item.id === clubId)
    let resourceElement = clubElement.resources.find(
      (item) => item.id === resourceId
    )
    resourceElement.contacts = resourceElement.contacts || []
    resourceElement.contacts = [...resourceElement.contacts, contact]
    this.setState(() => {
      return { workspaceElements: oldList }
    })
  }

  editContact = (id, key, clubId, resourceId, contactId, newContact) => {
    const oldList = [...this.state.workspaceElements]
    let element = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )
    let clubElement = element.clubs.find((item) => item.id === clubId)
    let resourceElement = clubElement.resources.find(
      (item) => item.id === resourceId
    )
    let contactElement = resourceElement.contacts.find(
      (item) => item.id === contactId
    )
    contactElement.title = newContact.title
    contactElement.createdOn = newContact.createdOn
    contactElement.createdBy = newContact.createdBy
    contactElement.company = newContact.company
    contactElement.personName = newContact.personName
    contactElement.personalDetails = newContact.personalDetails
    contactElement.links = newContact.links

    this.setState(() => {
      return { workspaceElements: oldList }
    })
  }

  deleteContact = (id, key, clubId, resourceId, contactId) => {
    const oldList = [...this.state.workspaceElements]
    let element = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )
    let clubElement = element.clubs.find((item) => item.id === clubId)
    let resourceElement = clubElement.resources.find(
      (item) => item.id === resourceId
    )
    const newContactsList = resourceElement.contacts.filter(
      (item) => item.id !== contactId
    )
    resourceElement.contacts = newContactsList
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
          deleteSpace: this.deleteSpace,
          handleDetailSpace: this.handleDetailSpace,
          addBook: this.addBook,
          deleteBook: this.deleteBook,
          addNewSubject: this.addNewSubject,
          editSubject: this.editSubject,
          addNewClub: this.addNewClub,
          deleteClub: this.deleteClub,
          addNewResource: this.addNewResource,
          handleClubInfo: this.handleClubInfo,
          addTask: this.addTask,
          taskManipulation: this.taskManipulation,
          deleteTask: this.deleteTask,
          editTask: this.editTask,
          addNewMeeting: this.addNewMeeting,
          editMeeting: this.editMeeting,
          deleteMeeting: this.deleteMeeting,
          addNewIdea: this.addNewIdea,
          editIdea: this.editIdea,
          deleteIdea: this.deleteIdea,
          addNewFinance: this.addNewFinance,
          editFinance: this.editFinance,
          deleteFinance: this.deleteFinance,
          addNewContact: this.addNewContact,
          editContact: this.editContact,
          deleteContact: this.deleteContact,
        }}
      >
        {this.props.children}
      </WorkspaceContext.Provider>
    )
  }
}

const WorkspaceConsumer = WorkspaceContext.Consumer

export { WorkspaceProvider, WorkspaceConsumer }
