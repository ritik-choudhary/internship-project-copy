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
    selectedItem.type = 'Workspace'
    this.setState(() => {
      return {
        workspaceList: oldList,
        trash: [...this.state.trash, selectedItem],
      }
    })
  }
  restoreWorkspace = (id) => {
    let oldTrashList = this.state.trash
    const selectedItem = oldTrashList.find((item) => item.id === id)
    oldTrashList = oldTrashList.filter((element) => element.id !== id)
    this.setState(() => {
      return {
        trash: oldTrashList,
        workspaceList: [...this.state.workspaceList, selectedItem],
      }
    })
  }
  deleteWorkspacePermanently = (id) => {
    let oldTrashList = this.state.trash
    oldTrashList = oldTrashList.filter((element) => element.id !== id)
    this.setState(() => {
      return {
        trash: oldTrashList,
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
    taskElement.links = task.links
    taskElement.pdfList = task.pdfList
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
    meetingElement.title = newMeeting.title
    meetingElement.createdOn = newMeeting.createdOn
    meetingElement.createdBy = newMeeting.createdBy
    meetingElement.type = newMeeting.type
    meetingElement.participants = newMeeting.participants
    meetingElement.links = newMeeting.links
    meetingElement.pdfList = newMeeting.pdfList
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
    ideaElement.pdfList = newIdea.pdfList
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

  addNewMoodboard = (id, key, moodboard) => {
    const oldList = [...this.state.workspaceElements]
    let element = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )
    element.moodboards = element.moodboards || []
    element.moodboards = [...element.moodboards, moodboard]
    this.setState(() => {
      return { workspaceElements: oldList }
    })
  }

  addNewDigitalBrainboard = (id, key, digitalBrainboard) => {
    const oldList = [...this.state.workspaceElements]
    let element = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )
    element.digitalBrainboards = element.digitalBrainboards || []
    element.digitalBrainboards = [
      ...element.digitalBrainboards,
      digitalBrainboard,
    ]
    this.setState(() => {
      return { workspaceElements: oldList }
    })
  }

  deleteMoodboard = (id, key, moodboardId) => {
    const oldList = [...this.state.workspaceElements]
    let element = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )
    const newMoodboardList = element.moodboards.filter(
      (item) => item.id !== moodboardId
    )
    element.moodboards = newMoodboardList
    this.setState(() => {
      return { workspaceElements: oldList }
    })
  }

  deleteDigitalBrainboard = (id, key, digitalBrainboardId) => {
    const oldList = [...this.state.workspaceElements]
    let element = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )
    const newBrainboardList = element.digitalBrainboards.filter(
      (item) => item.id !== digitalBrainboardId
    )
    element.digitalBrainboards = newBrainboardList
    this.setState(() => {
      return { workspaceElements: oldList }
    })
  }

  editDigitalBrainboard = (id, key, digitalBrainboardId, brainboard) => {
    const oldList = [...this.state.workspaceElements]
    let element = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )
    let brainboardElement = element.digitalBrainboards.find(
      (item) => item.id === digitalBrainboardId
    )
    brainboardElement.createdBy = brainboard.createdBy
    brainboardElement.tags = brainboard.tags
    brainboardElement.subject = brainboard.subject
    brainboardElement.links = brainboard.links
    this.setState(() => {
      return { workspaceElements: oldList }
    })
  }

  addMoodboardField = (id, key, moodboardId, moodboardField) => {
    const oldList = [...this.state.workspaceElements]
    let element = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )
    let moodboardElement = element.moodboards.find(
      (item) => item.id === moodboardId
    )
    moodboardElement.moodboardFields = moodboardElement.moodboardFields || []
    moodboardElement.moodboardFields = [
      ...moodboardElement.moodboardFields,
      moodboardField,
    ]
    this.setState(() => {
      return { workspaceElements: oldList }
    })
  }

  deleteMoodboardField = (id, key, moodboardId, fieldId) => {
    const oldList = [...this.state.workspaceElements]
    let element = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )
    let moodboardElement = element.moodboards.find(
      (item) => item.id === moodboardId
    )
    let newFieldsList = moodboardElement.moodboardFields.filter(
      (item) => item.id !== fieldId
    )
    moodboardElement.moodboardFields = newFieldsList
    this.setState(() => {
      return { workspaceElements: oldList }
    })
  }

  addNewHabit = (id, key, habit) => {
    const oldList = [...this.state.workspaceElements]
    let element = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )
    element.habits = element.habits || []
    element.habits = [...element.habits, habit]
    this.setState(() => {
      return { workspaceElements: oldList }
    })
  }

  deleteHabit = (id, key, habitId) => {
    const oldList = [...this.state.workspaceElements]
    let element = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )
    const newHabitList = element.habits.filter((item) => item.id !== habitId)
    element.habits = newHabitList
    this.setState(() => {
      return { workspaceElements: oldList }
    })
  }

  addNewWorkshop = (id, key, workshop) => {
    const oldList = [...this.state.workspaceElements]
    let element = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )
    element.workshops = element.workshops || []
    element.workshops = [...element.workshops, workshop]
    this.setState(() => {
      return { workspaceElements: oldList }
    })
  }

  deleteWorkshop = (id, key, workshopId) => {
    const oldList = [...this.state.workspaceElements]
    let element = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )
    const newWorkshopList = element.workshops.filter(
      (item) => item.id !== workshopId
    )
    element.workshops = newWorkshopList
    this.setState(() => {
      return { workspaceElements: oldList }
    })
  }

  handleWorkshopInfo = (id, key, workshopId, info) => {
    const oldList = [...this.state.workspaceElements]
    let element = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )
    let workshopElement = element.workshops.find(
      (item) => item.id === workshopId
    )
    workshopElement.basicInfo = workshopElement.basicInfo || {}
    workshopElement.basicInfo = {
      conductedBy: info.conductedBy,
      members: info.members,
      about: info.about,
    }
    this.setState(() => {
      return { workspaceElements: oldList }
    })
  }

  addNewWorkshopResource = (id, key, workshopId, resource) => {
    const oldList = [...this.state.workspaceElements]
    let element = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )
    let workshopElement = element.workshops.find(
      (item) => item.id === workshopId
    )
    workshopElement.resources = workshopElement.resources || []
    workshopElement.resources = [...workshopElement.resources, resource]
    this.setState(() => {
      return { workspaceElements: oldList }
    })
  }

  addNewTopicInformation = (
    id,
    key,
    workshopId,
    resourceId,
    topicInformation
  ) => {
    const oldList = [...this.state.workspaceElements]
    let element = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )
    let workshopElement = element.workshops.find(
      (item) => item.id === workshopId
    )
    let resourceElement = workshopElement.resources.find(
      (item) => item.id === resourceId
    )
    resourceElement.topicInformations = resourceElement.topicInformations || []
    resourceElement.topicInformations = [
      ...resourceElement.topicInformations,
      topicInformation,
    ]
    this.setState(() => {
      return { workspaceElements: oldList }
    })
  }

  editTopicInformation = (
    id,
    key,
    workshopId,
    resourceId,
    topicInformationId,
    newTopicInformation
  ) => {
    const oldList = [...this.state.workspaceElements]
    let element = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )
    let workshopElement = element.workshops.find(
      (item) => item.id === workshopId
    )
    let resourceElement = workshopElement.resources.find(
      (item) => item.id === resourceId
    )
    let topicInformationElement = resourceElement.topicInformations.find(
      (item) => item.id === topicInformationId
    )
    topicInformationElement.title = newTopicInformation.title
    topicInformationElement.createdOn = newTopicInformation.createdOn
    topicInformationElement.createdBy = newTopicInformation.createdBy
    topicInformationElement.note = newTopicInformation.note

    this.setState(() => {
      return { workspaceElements: oldList }
    })
  }

  deleteTopicInformation = (
    id,
    key,
    workshopId,
    resourceId,
    topicInformationId
  ) => {
    const oldList = [...this.state.workspaceElements]
    let element = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )
    let workshopElement = element.workshops.find(
      (item) => item.id === workshopId
    )
    let resourceElement = workshopElement.resources.find(
      (item) => item.id === resourceId
    )
    const newTopicInformationsList = resourceElement.topicInformations.filter(
      (item) => item.id !== topicInformationId
    )
    resourceElement.topicInformations = newTopicInformationsList
    this.setState(() => {
      return { workspaceElements: oldList }
    })
  }

  addNewParticipants = (id, key, workshopId, resourceId, participant) => {
    const oldList = [...this.state.workspaceElements]
    let element = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )
    let workshopElement = element.workshops.find(
      (item) => item.id === workshopId
    )
    let resourceElement = workshopElement.resources.find(
      (item) => item.id === resourceId
    )
    resourceElement.participantsList = resourceElement.participantsList || []
    resourceElement.participantsList = [
      ...resourceElement.participantsList,
      participant,
    ]
    this.setState(() => {
      return { workspaceElements: oldList }
    })
  }

  editParticipants = (
    id,
    key,
    workshopId,
    resourceId,
    participantsId,
    newParticipants
  ) => {
    const oldList = [...this.state.workspaceElements]
    let element = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )
    let workshopElement = element.workshops.find(
      (item) => item.id === workshopId
    )
    let resourceElement = workshopElement.resources.find(
      (item) => item.id === resourceId
    )
    let participantsElement = resourceElement.participantsList.find(
      (item) => item.id === participantsId
    )
    participantsElement.title = newParticipants.title
    participantsElement.createdOn = newParticipants.createdOn
    participantsElement.createdBy = newParticipants.createdBy
    participantsElement.note = newParticipants.note

    this.setState(() => {
      return { workspaceElements: oldList }
    })
  }

  deleteParticipants = (id, key, workshopId, resourceId, participantsId) => {
    const oldList = [...this.state.workspaceElements]
    let element = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )
    let workshopElement = element.workshops.find(
      (item) => item.id === workshopId
    )
    let resourceElement = workshopElement.resources.find(
      (item) => item.id === resourceId
    )
    const newParticipantsList = resourceElement.participantsList.filter(
      (item) => item.id !== participantsId
    )
    resourceElement.participantsList = newParticipantsList
    this.setState(() => {
      return { workspaceElements: oldList }
    })
  }

  addNewActivities = (id, key, workshopId, resourceId, activity) => {
    const oldList = [...this.state.workspaceElements]
    let element = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )
    let workshopElement = element.workshops.find(
      (item) => item.id === workshopId
    )
    let resourceElement = workshopElement.resources.find(
      (item) => item.id === resourceId
    )
    resourceElement.activitiesList = resourceElement.activitiesList || []
    resourceElement.activitiesList = [
      ...resourceElement.activitiesList,
      activity,
    ]
    this.setState(() => {
      return { workspaceElements: oldList }
    })
  }

  editActivities = (
    id,
    key,
    workshopId,
    resourceId,
    activitiesId,
    newActivities
  ) => {
    const oldList = [...this.state.workspaceElements]
    let element = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )
    let workshopElement = element.workshops.find(
      (item) => item.id === workshopId
    )
    let resourceElement = workshopElement.resources.find(
      (item) => item.id === resourceId
    )
    let activitiesElement = resourceElement.activitiesList.find(
      (item) => item.id === activitiesId
    )
    activitiesElement.title = newActivities.title
    activitiesElement.createdOn = newActivities.createdOn
    activitiesElement.createdBy = newActivities.createdBy
    activitiesElement.note = newActivities.note

    this.setState(() => {
      return { workspaceElements: oldList }
    })
  }

  deleteActivities = (id, key, workshopId, resourceId, activitiesId) => {
    const oldList = [...this.state.workspaceElements]
    let element = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )
    let workshopElement = element.workshops.find(
      (item) => item.id === workshopId
    )
    let resourceElement = workshopElement.resources.find(
      (item) => item.id === resourceId
    )
    const newActivitiesList = resourceElement.activitiesList.filter(
      (item) => item.id !== activitiesId
    )
    resourceElement.activitiesList = newActivitiesList
    this.setState(() => {
      return { workspaceElements: oldList }
    })
  }

  addNewItinerary = (id, key, workshopId, resourceId, itinerary) => {
    const oldList = [...this.state.workspaceElements]
    let element = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )
    let workshopElement = element.workshops.find(
      (item) => item.id === workshopId
    )
    let resourceElement = workshopElement.resources.find(
      (item) => item.id === resourceId
    )
    resourceElement.itineraryList = resourceElement.itineraryList || []
    resourceElement.itineraryList = [
      ...resourceElement.itineraryList,
      itinerary,
    ]
    this.setState(() => {
      return { workspaceElements: oldList }
    })
  }

  editItinerary = (
    id,
    key,
    workshopId,
    resourceId,
    itineraryId,
    newItinerary
  ) => {
    const oldList = [...this.state.workspaceElements]
    let element = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )
    let workshopElement = element.workshops.find(
      (item) => item.id === workshopId
    )
    let resourceElement = workshopElement.resources.find(
      (item) => item.id === resourceId
    )
    let itineraryElement = resourceElement.itineraryList.find(
      (item) => item.id === itineraryId
    )
    itineraryElement.title = newItinerary.title
    itineraryElement.createdOn = newItinerary.createdOn
    itineraryElement.createdBy = newItinerary.createdBy
    itineraryElement.note = newItinerary.note

    this.setState(() => {
      return { workspaceElements: oldList }
    })
  }

  deleteItinerary = (id, key, workshopId, resourceId, itineraryId) => {
    const oldList = [...this.state.workspaceElements]
    let element = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )
    let workshopElement = element.workshops.find(
      (item) => item.id === workshopId
    )
    let resourceElement = workshopElement.resources.find(
      (item) => item.id === resourceId
    )
    const newItineraryList = resourceElement.itineraryList.filter(
      (item) => item.id !== itineraryId
    )
    resourceElement.itineraryList = newItineraryList
    this.setState(() => {
      return { workspaceElements: oldList }
    })
  }

  addNewCommittee = (id, key, workshopId, resourceId, committee) => {
    const oldList = [...this.state.workspaceElements]
    let element = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )
    let workshopElement = element.workshops.find(
      (item) => item.id === workshopId
    )
    let resourceElement = workshopElement.resources.find(
      (item) => item.id === resourceId
    )
    resourceElement.committeeList = resourceElement.committeeList || []
    resourceElement.committeeList = [
      ...resourceElement.committeeList,
      committee,
    ]
    this.setState(() => {
      return { workspaceElements: oldList }
    })
  }

  editCommittee = (
    id,
    key,
    workshopId,
    resourceId,
    committeeId,
    newCommittee
  ) => {
    const oldList = [...this.state.workspaceElements]
    let element = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )
    let workshopElement = element.workshops.find(
      (item) => item.id === workshopId
    )
    let resourceElement = workshopElement.resources.find(
      (item) => item.id === resourceId
    )
    let committeeElement = resourceElement.committeeList.find(
      (item) => item.id === committeeId
    )
    committeeElement.title = newCommittee.title
    committeeElement.createdOn = newCommittee.createdOn
    committeeElement.createdBy = newCommittee.createdBy
    committeeElement.note = newCommittee.note

    this.setState(() => {
      return { workspaceElements: oldList }
    })
  }

  deleteCommittee = (id, key, workshopId, resourceId, committeeId) => {
    const oldList = [...this.state.workspaceElements]
    let element = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )
    let workshopElement = element.workshops.find(
      (item) => item.id === workshopId
    )
    let resourceElement = workshopElement.resources.find(
      (item) => item.id === resourceId
    )
    const newCommitteeList = resourceElement.committeeList.filter(
      (item) => item.id !== committeeId
    )
    resourceElement.committeeList = newCommitteeList
    this.setState(() => {
      return { workspaceElements: oldList }
    })
  }

  addNewVenueDetails = (id, key, workshopId, resourceId, venueDetails) => {
    const oldList = [...this.state.workspaceElements]
    let element = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )
    let workshopElement = element.workshops.find(
      (item) => item.id === workshopId
    )
    let resourceElement = workshopElement.resources.find(
      (item) => item.id === resourceId
    )
    resourceElement.venueDetailsList = resourceElement.venueDetailsList || []
    resourceElement.venueDetailsList = [
      ...resourceElement.venueDetailsList,
      venueDetails,
    ]
    this.setState(() => {
      return { workspaceElements: oldList }
    })
  }

  editVenueDetails = (
    id,
    key,
    workshopId,
    resourceId,
    venueDetailsId,
    newVenueDetails
  ) => {
    const oldList = [...this.state.workspaceElements]
    let element = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )
    let workshopElement = element.workshops.find(
      (item) => item.id === workshopId
    )
    let resourceElement = workshopElement.resources.find(
      (item) => item.id === resourceId
    )
    let venueDetailsElement = resourceElement.venueDetailsList.find(
      (item) => item.id === venueDetailsId
    )
    venueDetailsElement.title = newVenueDetails.title
    venueDetailsElement.createdOn = newVenueDetails.createdOn
    venueDetailsElement.createdBy = newVenueDetails.createdBy
    venueDetailsElement.note = newVenueDetails.note

    this.setState(() => {
      return { workspaceElements: oldList }
    })
  }

  deleteVenueDetails = (id, key, workshopId, resourceId, venueDetailsId) => {
    const oldList = [...this.state.workspaceElements]
    let element = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )
    let workshopElement = element.workshops.find(
      (item) => item.id === workshopId
    )
    let resourceElement = workshopElement.resources.find(
      (item) => item.id === resourceId
    )
    const newVenueDetailsList = resourceElement.venueDetailsList.filter(
      (item) => item.id !== venueDetailsId
    )
    resourceElement.venueDetailsList = newVenueDetailsList
    this.setState(() => {
      return { workspaceElements: oldList }
    })
  }

  addTodo = (id, key, todo) => {
    const oldList = [...this.state.workspaceElements]
    let element = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )
    element.todoList = element.todoList || []
    element.todoList = [...element.todoList, todo]
    this.setState(() => {
      return { workspaceElements: oldList }
    })
  }

  deleteTodo = (id, key, todoId) => {
    const oldList = [...this.state.workspaceElements]
    let element = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )
    const newTodoList = element.todoList.filter((item) => item.id !== todoId)
    element.todoList = newTodoList
    this.setState(() => {
      return { workspaceElements: oldList }
    })
  }

  editTodo = (id, key, todoId, todo) => {
    const oldList = [...this.state.workspaceElements]
    let element = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )
    let todoElement = element.todoList.find((item) => item.id === todoId)

    todoElement.title = todo.title
    todoElement.createdOn = todo.createdOn
    todoElement.dueDate = todo.dueDate
    todoElement.links = todo.links
    todoElement.pdfList = todo.pdfList
    todoElement.description = todo.description

    this.setState(() => {
      return { workspaceElements: oldList }
    })
  }

  todoManipulation = (id, key, todoId) => {
    const oldList = [...this.state.workspaceElements]
    let element = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )
    let todoElement = element.todoList.find((item) => item.id === todoId)
    todoElement.completed = !todoElement.completed
    this.setState(() => {
      return { workspaceElements: oldList }
    })
  }

  addBucketList = (id, key, bucket) => {
    const oldList = [...this.state.workspaceElements]
    let element = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )
    element.bucketList = element.bucketList || []
    element.bucketList = [...element.bucketList, bucket]
    this.setState(() => {
      return { workspaceElements: oldList }
    })
  }

  editBucketList = (id, key, bucketId, bucket) => {
    const oldList = [...this.state.workspaceElements]
    let element = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )
    let bucketElement = element.bucketList.find((item) => item.id === bucketId)

    bucketElement.title = bucket.title
    bucketElement.createdOn = bucket.createdOn
    bucketElement.type = bucket.type
    bucketElement.images = bucket.images
    bucketElement.previews = bucket.previews

    this.setState(() => {
      return { workspaceElements: oldList }
    })
  }

  deleteBucketImage = (id, key, bucketId, imageId) => {
    const oldList = [...this.state.workspaceElements]
    let element = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )
    let bucketElement = element.bucketList.find((item) => item.id === bucketId)

    const previewToDelete = bucketElement.previews.find(
      (item) => item.previewId === imageId
    )

    const imageToDelete = bucketElement.images.find(
      (item) => item.imageId === imageId
    )
    console.log('image to delete', imageToDelete)

    previewToDelete.type = 'Image'
    previewToDelete.workspaceId = id
    previewToDelete.spaceKey = key
    previewToDelete.bucketId = bucketId
    previewToDelete.file = imageToDelete.imageFile

    let newPreviews = bucketElement.previews.filter(
      (item) => item.previewId !== imageId
    )

    let newImages = bucketElement.images.filter(
      (item) => item.imageId !== imageId
    )

    bucketElement.previews = newPreviews
    bucketElement.images = newImages

    this.setState(() => {
      return {
        workspaceElements: oldList,
        trash: [...this.state.trash, previewToDelete],
      }
    })
  }

  restoreBucketImage = (id, key, bucketId, imageId) => {
    const oldTrashList = [...this.state.trash]
    const trashElement = oldTrashList.find((item) => item.previewId === imageId)
    console.log('trash element', trashElement)
    const oldWorkspaceElements = [...this.state.workspaceElements]
    let spaceElement = oldWorkspaceElements.find(
      (item) => item.id === key && item.workspaceID === id
    )
    let bucketElement = spaceElement.bucketList.find(
      (item) => item.id === bucketId
    )
    console.log('bucketElement', bucketElement)
    let newPreviews = bucketElement.previews
    let newImages = bucketElement.images
    newImages = [
      ...newImages,
      { imageId: trashElement.previewId, imageFile: trashElement.file },
    ]
    newPreviews = [...newPreviews, trashElement]
    bucketElement.previews = newPreviews
    bucketElement.images = newImages
    console.log('new previews', newPreviews)
    console.log('new images', newImages)
    const newTrashList = oldTrashList.filter(
      (item) => item.previewId !== imageId
    )
    this.setState(() => {
      return {
        workspaceElements: oldWorkspaceElements,
        trash: newTrashList,
      }
    })
  }

  deleteBucketImagePermanently = (id) => {
    let oldTrashList = [...this.state.trash]
    const newTrashList = oldTrashList.filter((item) => item.previewId !== id)
    this.setState(() => {
      return {
        trash: newTrashList,
      }
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
          restoreWorkspace: this.restoreWorkspace,
          deleteWorkspacePermanently: this.deleteWorkspacePermanently,
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
          addNewMoodboard: this.addNewMoodboard,
          addNewDigitalBrainboard: this.addNewDigitalBrainboard,
          deleteMoodboard: this.deleteMoodboard,
          deleteDigitalBrainboard: this.deleteDigitalBrainboard,
          editDigitalBrainboard: this.editDigitalBrainboard,
          addMoodboardField: this.addMoodboardField,
          deleteMoodboardField: this.deleteMoodboardField,
          addNewHabit: this.addNewHabit,
          deleteHabit: this.deleteHabit,
          addNewWorkshop: this.addNewWorkshop,
          deleteWorkshop: this.deleteWorkshop,
          handleWorkshopInfo: this.handleWorkshopInfo,
          handleClubInfo: this.handleClubInfo,
          addNewWorkshopResource: this.addNewWorkshopResource,
          addNewTopicInformation: this.addNewTopicInformation,
          editTopicInformation: this.editTopicInformation,
          deleteTopicInformation: this.deleteTopicInformation,
          addNewParticipants: this.addNewParticipants,
          editParticipants: this.editParticipants,
          deleteParticipants: this.deleteParticipants,
          addNewActivities: this.addNewActivities,
          editActivities: this.editActivities,
          deleteActivities: this.deleteActivities,
          addNewItinerary: this.addNewItinerary,
          editItinerary: this.editItinerary,
          deleteItinerary: this.deleteItinerary,
          addNewCommittee: this.addNewCommittee,
          editCommittee: this.editCommittee,
          deleteCommittee: this.deleteCommittee,
          addNewVenueDetails: this.addNewVenueDetails,
          editVenueDetails: this.editVenueDetails,
          deleteVenueDetails: this.deleteVenueDetails,
          addTodo: this.addTodo,
          deleteTodo: this.deleteTodo,
          editTodo: this.editTodo,
          todoManipulation: this.todoManipulation,
          addBucketList: this.addBucketList,
          editBucketList: this.editBucketList,
          deleteBucketImage: this.deleteBucketImage,
          restoreBucketImage: this.restoreBucketImage,
          deleteBucketImagePermanently: this.deleteBucketImagePermanently,
        }}
      >
        {this.props.children}
      </WorkspaceContext.Provider>
    )
  }
}

const WorkspaceConsumer = WorkspaceContext.Consumer

export { WorkspaceProvider, WorkspaceConsumer }
