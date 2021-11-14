import React, { Component } from 'react'

const WorkspaceContext = React.createContext()

class WorkspaceProvider extends Component {
  state = {
    workspaceList: [],
    trash: [],
    detailWorkspace: {},
    detailSpace: {},
    workspaceElements: [],
    journal: [],
    notes: [],
    internships: [],
    taskManager: [[], [], [], []],
    documentShelf: [],
    tutorial: true,
  }

  addNewWorkspace = (newItem) => {
    const oldList = this.state.workspaceList
    this.setState({
      workspaceList: [...oldList, newItem],
    })
  }
  editWorkspace = (id, newTitle, newThumbnail, version) => {
    const oldList = this.state.workspaceList
    const selectedItem = oldList.find((item) => item.id === id)
    const index = oldList.indexOf(selectedItem)
    const item = oldList[index]
    item.title = newTitle
    item.image = newThumbnail
    item.version = version
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

  editSpace = (newSpace) => {
    const oldList = [...this.state.workspaceElements]
    const spaceToEdit = oldList.find(
      (item) =>
        item.id === newSpace.id && item.workspaceID === newSpace.workspaceID
    )
    spaceToEdit.image = newSpace.image
    spaceToEdit.altName = newSpace.altName
    this.setState({ workspaceElements: oldList })
  }

  deleteSpace = (key) => {
    const oldList = [...this.state.workspaceElements]
    const spaceToDelete = oldList.find((item) => item.id === key)
    let newTrashList = [...this.state.trash]
    spaceToDelete.type = 'Space'
    newTrashList = [...newTrashList, spaceToDelete]
    const newList = oldList.filter((item) => item.id !== key)

    this.setState({ workspaceElements: newList, trash: newTrashList })
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
      element.bookShelf = element.bookShelf || []
      element.bookShelf = [...element.bookShelf, book]
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
    let newTrashList = [...this.state.trash]
    let BookToDelete
    let element = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )
    if (favourite) {
      BookToDelete = element.favouriteBooks.find((book) => book.id === bookID)
      BookToDelete.type = 'Book'
      BookToDelete.spaceID = key

      newTrashList = [...newTrashList, BookToDelete]
      const newBookList = element.favouriteBooks.filter(
        (book) => book.id !== bookID
      )
      const newShelfList = element.bookShelf.filter(
        (book) => book.id !== bookID
      )
      element.bookShelf = newShelfList
      element.favouriteBooks = newBookList
    } else {
      BookToDelete = element.bookShelf.find((book) => book.id === bookID)
      BookToDelete.type = 'Book'
      BookToDelete.spaceID = key
      newTrashList = [...newTrashList, BookToDelete]
      const newBookList = element.bookShelf.filter((book) => book.id !== bookID)
      element.bookShelf = newBookList
    }
    this.setState(() => {
      return { workspaceElements: oldList, trash: newTrashList }
    })
  }

  toggleFavourite = (id, key, favourite, bookId) => {
    const oldList = [...this.state.workspaceElements]
    let selectedSpace = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )
    if (favourite) {
      let selectedBook = selectedSpace.favouriteBooks.find(
        (item) => item.id === bookId
      )
      let newFavouriteList = [...selectedSpace.favouriteBooks]
      newFavouriteList = newFavouriteList.filter((item) => item.id !== bookId)
      selectedSpace.favouriteBooks = newFavouriteList
      selectedBook.favourite = false
    } else {
      let selectedBook = selectedSpace.bookShelf.find(
        (item) => item.id === bookId
      )
      selectedBook.favourite = !selectedBook.favourite
      if (selectedBook.favourite) {
        let newFavouriteList = [...selectedSpace.favouriteBooks]
        const selectedBook = selectedSpace.bookShelf.find(
          (item) => item.id === bookId
        )
        newFavouriteList = [...newFavouriteList, selectedBook]
        selectedSpace.favouriteBooks = newFavouriteList
      }
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

  editClub = (id, key, clubId, club) => {
    const oldList = [...this.state.workspaceElements]
    const selectedSpace = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )
    let selectedClub = selectedSpace.clubs.find((item) => item.id === clubId)
    selectedClub.title = club.title
    selectedClub.image = club.image
    this.setState(() => {
      return { workspaceElements: oldList }
    })
  }

  deleteClub = (id, key, clubId) => {
    const oldList = [...this.state.workspaceElements]
    let newTrashList = [...this.state.trash]
    let element = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )
    let clubToDelete = element.clubs.find((item) => item.id === clubId)
    clubToDelete.type = 'College Club'
    clubToDelete.spaceID = key
    newTrashList = [...newTrashList, clubToDelete]
    const newClubList = element.clubs.filter((item) => item.id !== clubId)
    element.clubs = newClubList
    this.setState(() => {
      return { workspaceElements: oldList, trash: newTrashList }
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
    let oldTaskManager = [...this.state.taskManager]
    let element = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )
    let clubElement = element.clubs.find((item) => item.id === clubId)
    let resourceElement = clubElement.resources.find(
      (item) => item.id === resourceId
    )
    resourceElement.tasks = resourceElement.tasks || []
    resourceElement.tasks = [...resourceElement.tasks, task]
    task.parent = 'College Clubs'
    if (task.status === 'To-do') {
      oldTaskManager[1] = [...oldTaskManager[1], task]
    }
    if (task.status === 'In-Progress') {
      oldTaskManager[2] = [...oldTaskManager[2], task]
    }
    if (task.status === 'Completed') {
      oldTaskManager[3] = [...oldTaskManager[3], task]
    }
    this.setState(() => {
      return { workspaceElements: oldList, taskManager: oldTaskManager }
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
    taskElement.status = taskElement.completed ? 'Completed' : 'To-do'
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

  deleteLinkFromTasks = (id, key, clubId, resourceId, taskId, linkId) => {
    const oldList = [...this.state.workspaceElements]
    let element = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )
    let clubElement = element.clubs.find((item) => item.id === clubId)
    let resourceElement = clubElement.resources.find(
      (item) => item.id === resourceId
    )
    let taskElement = resourceElement.tasks.find((item) => item.id === taskId)
    const newLinkList = taskElement.links.filter((item) => item.id !== linkId)
    taskElement.links = newLinkList
    this.setState(() => {
      return { workspaceElements: oldList }
    })
  }

  deleteDocFromTasks = (id, key, clubId, resourceId, taskId, docId) => {
    const oldList = [...this.state.workspaceElements]
    let element = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )
    let clubElement = element.clubs.find((item) => item.id === clubId)
    let resourceElement = clubElement.resources.find(
      (item) => item.id === resourceId
    )
    let taskElement = resourceElement.tasks.find((item) => item.id === taskId)
    const newDocsList = taskElement.docsList.filter(
      (item) => item.docId !== docId
    )
    taskElement.docsList = newDocsList
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
    let taskElementIndex = resourceElement.tasks.findIndex(
      (item) => item.id === taskId
    )

    let taskElement = { ...resourceElement[taskElementIndex] }

    taskElement.title = task.title
    taskElement.createdOn = task.createdOn
    taskElement.dueDate = task.dueDate
    taskElement.links = task.links
    taskElement.pdfList = task.pdfList
    taskElement.description = task.description
    taskElement.status = task.status

    resourceElement[taskElementIndex] = taskElement

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
    let newTrashList = [...this.state.trash]
    let element = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )
    let clubElement = element.clubs.find((item) => item.id === clubId)
    let resourceElement = clubElement.resources.find(
      (item) => item.id === resourceId
    )
    let meetingToDelete = resourceElement.meetings.find(
      (item) => item.id === meetingId
    )
    meetingToDelete.type = 'Club Meeting'
    meetingToDelete.spaceID = key
    meetingToDelete.resourceID = resourceId
    meetingToDelete.clubID = clubId
    newTrashList = [...newTrashList, meetingToDelete]
    const newMeetingsList = resourceElement.meetings.filter(
      (item) => item.id !== meetingId
    )
    resourceElement.meetings = newMeetingsList
    this.setState(() => {
      return { workspaceElements: oldList, trash: newTrashList }
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
    let newTrashList = [...this.state.trash]
    let element = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )
    let clubElement = element.clubs.find((item) => item.id === clubId)
    let resourceElement = clubElement.resources.find(
      (item) => item.id === resourceId
    )
    let ideaToDelete = resourceElement.ideas.find((item) => item.id === ideaId)
    ideaToDelete.type = 'Club Idea'
    ideaToDelete.resourceID = resourceId
    ideaToDelete.clubID = clubId
    ideaToDelete.spaceID = key

    newTrashList = [...newTrashList, ideaToDelete]
    const newIdeasList = resourceElement.ideas.filter(
      (item) => item.id !== ideaId
    )
    resourceElement.ideas = newIdeasList
    this.setState(() => {
      return { workspaceElements: oldList, trash: newTrashList }
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
    financeElement.financersList = newFinance.financersList
    financeElement.sponsorsList = newFinance.sponsorsList
    financeElement.personalDetails = newFinance.personalDetails
    financeElement.links = newFinance.links

    this.setState(() => {
      return { workspaceElements: oldList }
    })
  }

  deleteFinance = (id, key, clubId, resourceId, financeId) => {
    const oldList = [...this.state.workspaceElements]
    let newTrashList = [...this.state.trash]
    let element = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )
    let clubElement = element.clubs.find((item) => item.id === clubId)
    let resourceElement = clubElement.resources.find(
      (item) => item.id === resourceId
    )
    let financeToDelete = resourceElement.finances.find(
      (item) => item.id === financeId
    )
    financeToDelete.type = 'Club Finance'
    financeToDelete.resourceID = resourceId
    financeToDelete.clubID = clubId
    financeToDelete.spaceID = key
    newTrashList = [...newTrashList, financeToDelete]
    const newFinancesList = resourceElement.finances.filter(
      (item) => item.id !== financeId
    )
    resourceElement.finances = newFinancesList
    this.setState(() => {
      return { workspaceElements: oldList, trash: newTrashList }
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
    contactElement.personNamesList = newContact.personNamesList
    contactElement.personalDetails = newContact.personalDetails
    contactElement.links = newContact.links

    this.setState(() => {
      return { workspaceElements: oldList }
    })
  }

  deleteContact = (id, key, clubId, resourceId, contactId) => {
    const oldList = [...this.state.workspaceElements]
    let newTrashList = [...this.state.trash]
    let element = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )
    let clubElement = element.clubs.find((item) => item.id === clubId)
    let resourceElement = clubElement.resources.find(
      (item) => item.id === resourceId
    )
    let contactToDelete = resourceElement.contacts.find(
      (item) => item.id === contactId
    )
    contactToDelete.type = 'Club Contact'
    contactToDelete.resourceID = resourceId
    contactToDelete.clubID = clubId
    contactToDelete.spaceID = key
    newTrashList = [...newTrashList, contactToDelete]
    const newContactsList = resourceElement.contacts.filter(
      (item) => item.id !== contactId
    )
    resourceElement.contacts = newContactsList
    this.setState(() => {
      return { workspaceElements: oldList, trash: newTrashList }
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

  editMoodboard = (id, key, moodboardId, moodboard) => {
    const oldList = [...this.state.workspaceElements]
    const selectedSpace = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )
    let selectedMoodboard = selectedSpace.moodboards.find(
      (item) => item.id === moodboardId
    )
    selectedMoodboard.title = moodboard.title
    selectedMoodboard.image = moodboard.image
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

  editBasicsDigitalBrainboard = (id, key, brainboardId, brainboard) => {
    const oldList = [...this.state.workspaceElements]
    const selectedSpace = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )
    let selecteddigitalBrainboard = selectedSpace.digitalBrainboards.find(
      (item) => item.id === brainboardId
    )
    selecteddigitalBrainboard.title = brainboard.title
    selecteddigitalBrainboard.image = brainboard.image
    this.setState(() => {
      return { workspaceElements: oldList }
    })
  }

  deleteMoodboard = (id, key, moodboardId) => {
    const oldList = [...this.state.workspaceElements]
    let newTrashList = [...this.state.trash]
    let element = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )
    let moodboardToDelete = element.moodboards.find(
      (item) => item.id === moodboardId
    )
    moodboardToDelete.type = 'Moodboard'
    moodboardToDelete.spaceID = key
    newTrashList = [...newTrashList, moodboardToDelete]
    const newMoodboardList = element.moodboards.filter(
      (item) => item.id !== moodboardId
    )
    element.moodboards = newMoodboardList
    this.setState(() => {
      return { workspaceElements: oldList, trash: newTrashList }
    })
  }

  deleteDigitalBrainboard = (id, key, digitalBrainboardId) => {
    const oldList = [...this.state.workspaceElements]
    let newTrashList = [...this.state.trash]
    let element = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )
    let brainboardToDelete = element.digitalBrainboards.find(
      (item) => item.id === digitalBrainboardId
    )
    brainboardToDelete.type = 'Digital Brainboard'
    brainboardToDelete.spaceID = key
    newTrashList = [...newTrashList, brainboardToDelete]
    const newBrainboardList = element.digitalBrainboards.filter(
      (item) => item.id !== digitalBrainboardId
    )
    element.digitalBrainboards = newBrainboardList
    this.setState(() => {
      return { workspaceElements: oldList, trash: newTrashList }
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

  addNewHabitField = (id, key, habitId, newFieldsList, newStatus) => {
    const oldList = [...this.state.workspaceElements]
    let element = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )
    let habitElement = element.habits.find((item) => item.id === habitId)
    habitElement.fieldsList = newFieldsList
    habitElement.status = newStatus
    this.setState(() => {
      return { workspaceElements: oldList }
    })
  }

  deleteHabit = (id, key, habitId) => {
    const oldList = [...this.state.workspaceElements]
    let newTrashList = [...this.state.trash]
    let element = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )
    let habitToDelete = element.habits.find((item) => item.id === habitId)
    habitToDelete.type = 'Habit'
    habitToDelete.spaceID = key
    newTrashList = [...newTrashList, habitToDelete]
    const newHabitList = element.habits.filter((item) => item.id !== habitId)
    element.habits = newHabitList
    this.setState(() => {
      return { workspaceElements: oldList, trash: newTrashList }
    })
  }

  handleStatusOfHabit = (id, key, habitId, singleDate, fieldName) => {
    const oldList = [...this.state.workspaceElements]
    let element = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )
    let habitElement = element.habits.find((item) => item.id === habitId)
    habitElement.status.map((item) => {
      return Object.keys(item).forEach((singleField) => {
        if (singleField === fieldName) {
          item[singleField].forEach((date) => {
            if (date === singleDate) {
              date.completed = !date.completed
            }
          })
        }
      })
    })
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

  editWorkshop = (id, key, workshopId, workshop) => {
    const oldList = [...this.state.workspaceElements]
    const selectedSpace = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )
    let selectedWorkshop = selectedSpace.workshops.find(
      (item) => item.id === workshopId
    )
    selectedWorkshop.title = workshop.title
    selectedWorkshop.image = workshop.image
    this.setState(() => {
      return { workspaceElements: oldList }
    })
  }

  deleteWorkshop = (id, key, workshopId) => {
    const oldList = [...this.state.workspaceElements]
    let newTrashList = [...this.state.trash]
    let element = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )
    let workshopTodelete = element.workshops.find(
      (item) => item.id === workshopId
    )
    workshopTodelete.type = 'Workshop'
    workshopTodelete.spaceID = key
    newTrashList = [...newTrashList, workshopTodelete]
    const newWorkshopList = element.workshops.filter(
      (item) => item.id !== workshopId
    )
    element.workshops = newWorkshopList
    this.setState(() => {
      return { workspaceElements: oldList, trash: newTrashList }
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

  addNewOtherOption = (id, key, workshopId, resourceId, otherOption) => {
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
    resourceElement.otherOptionList = resourceElement.otherOptionList || []
    resourceElement.otherOptionList = [
      ...resourceElement.otherOptionList,
      otherOption,
    ]
    this.setState(() => {
      return { workspaceElements: oldList }
    })
  }

  editOtherOption = (
    id,
    key,
    workshopId,
    resourceId,
    otherOptionId,
    newOtherOption
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
    let otherOptionElement = resourceElement.otherOptionList.find(
      (item) => item.id === otherOptionId
    )
    otherOptionElement.title = newOtherOption.title
    otherOptionElement.createdOn = newOtherOption.createdOn
    otherOptionElement.createdBy = newOtherOption.createdBy
    otherOptionElement.note = newOtherOption.note

    this.setState(() => {
      return { workspaceElements: oldList }
    })
  }

  deleteOtherOption = (id, key, workshopId, resourceId, otherOptionId) => {
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
    const newotherOptionList = resourceElement.otherOptionList.filter(
      (item) => item.id !== otherOptionId
    )
    resourceElement.otherOptionList = newotherOptionList
    this.setState(() => {
      return { workspaceElements: oldList }
    })
  }

  addTodo = (id, key, todo) => {
    const oldList = [...this.state.workspaceElements]
    let oldTaskManager = [...this.state.taskManager]
    let element = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )
    element.todoList = element.todoList || []
    element.todoList = [...element.todoList, todo]
    todo.parent = 'Todo List'
    if (todo.status === 'To-do') {
      oldTaskManager[1] = [...oldTaskManager[1], todo]
    }
    if (todo.status === 'In-Progress') {
      oldTaskManager[2] = [...oldTaskManager[2], todo]
    }
    if (todo.status === 'Completed') {
      oldTaskManager[3] = [...oldTaskManager[3], todo]
    }
    this.setState(() => {
      return { workspaceElements: oldList, taskManager: oldTaskManager }
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
    todoElement.status = todo.status

    this.setState(() => {
      return { workspaceElements: oldList }
    })
  }

  deleteDocFromTodo = (id, key, todoId, docId) => {
    const oldList = [...this.state.workspaceElements]
    let element = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )

    let todoElement = element.todoList.find((item) => item.id === todoId)
    const newDocsList = todoElement.docsList.filter(
      (item) => item.docId !== docId
    )
    todoElement.docsList = newDocsList
    this.setState(() => {
      return { workspaceElements: oldList }
    })
  }

  deleteLinkFromTodo = (id, key, todoId, linkId) => {
    const oldList = [...this.state.workspaceElements]
    let element = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )

    let todoElement = element.todoList.find((item) => item.id === todoId)
    const newLinks = todoElement.links.filter((item) => item.id !== linkId)
    todoElement.links = newLinks
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
    todoElement.status = todoElement.completed ? 'Completed' : 'To-do'
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
    bucketElement.altType = bucket.altType
    bucketElement.images = bucket.images
    bucketElement.previews = bucket.previews

    this.setState(() => {
      return { workspaceElements: oldList }
    })
  }

  deleteBucketList = (id, key, bucketId) => {
    const oldList = [...this.state.workspaceElements]
    let newTrashList = [...this.state.trash]
    let element = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )
    let bucketListToDelete = element.bucketList.find(
      (item) => item.id === bucketId
    )
    bucketListToDelete.type = 'Bucket List'
    bucketListToDelete.spaceID = key
    newTrashList = [...newTrashList, bucketListToDelete]
    let newBucketList = element.bucketList.filter(
      (item) => item.id !== bucketId
    )
    element.bucketList = newBucketList
    this.setState(() => {
      return { workspaceElements: oldList, trash: newTrashList }
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

    previewToDelete.type = 'Bucket Image'
    previewToDelete.workspaceId = id
    previewToDelete.spaceID = key
    previewToDelete.bucketID = bucketId
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

    const oldWorkspaceElements = [...this.state.workspaceElements]
    let spaceElement = oldWorkspaceElements.find(
      (item) => item.id === key && item.workspaceID === id
    )
    let bucketElement = spaceElement.bucketList.find(
      (item) => item.id === bucketId
    )

    let newPreviews = bucketElement.previews
    let newImages = bucketElement.images
    newImages = [
      { imageId: trashElement.previewId, imageFile: trashElement.file },
      ...newImages,
    ]
    newPreviews = [trashElement, ...newPreviews]
    bucketElement.previews = newPreviews
    bucketElement.images = newImages
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

  addNewDocs = (id, key, docs) => {
    const oldList = [...this.state.workspaceElements]
    let element = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )
    element.docsList = element.docsList || []
    element.docsList = [...element.docsList, docs]
    this.setState(() => {
      return { workspaceElements: oldList }
    })
  }

  editDocs = (id, key, docsId, docs) => {
    const oldList = [...this.state.workspaceElements]
    let element = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )
    let docsElement = element.docsList.find((item) => item.id === docsId)

    docsElement.title = docs.title
    docsElement.createdOn = docs.createdOn
    docsElement.createdBy = docs.createdBy
    docsElement.type = docs.type
    docsElement.note = docs.note

    this.setState(() => {
      return { workspaceElements: oldList }
    })
  }

  deleteDocs = (id, key, docsId) => {
    const oldList = [...this.state.workspaceElements]
    let element = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )
    const docsToDelete = element.docsList.find((item) => item.id === docsId)
    docsToDelete.type = 'Docs'
    docsToDelete.spaceID = key
    const newDocsList = element.docsList.filter((item) => item.id !== docsId)
    element.docsList = newDocsList

    this.setState(() => {
      return {
        workspaceElements: oldList,
        trash: [...this.state.trash, docsToDelete],
      }
    })
  }

  deleteDocsPermanently = (id) => {
    let oldTrashList = [...this.state.trash]
    const newTrashList = oldTrashList.filter((item) => item.id !== id)
    this.setState(() => {
      return {
        trash: newTrashList,
      }
    })
  }

  addNewMeetingNotes = (id, key, meeting) => {
    const oldList = [...this.state.workspaceElements]
    let element = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )
    element.meetingNotes = element.meetingNotes || []
    element.meetingNotes = [...element.meetingNotes, meeting]
    this.setState(() => {
      return { workspaceElements: oldList }
    })
  }

  editMeetingNotes = (id, key, meetingId, newMeeting) => {
    const oldList = [...this.state.workspaceElements]
    let element = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )

    let meetingElement = element.meetingNotes.find(
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

  deleteMeetingNotes = (id, key, meetingId) => {
    const oldList = [...this.state.workspaceElements]
    let newTrashList = [...this.state.trash]
    let element = oldList.find(
      (item) => item.id === key && item.workspaceID === id
    )
    let meetingToDelete = element.meetingNotes.find(
      (item) => item.id === meetingId
    )
    meetingToDelete.type = 'Meeting Notes'
    meetingToDelete.spaceID = key
    newTrashList = [...newTrashList, meetingToDelete]
    const newMeetingNotes = element.meetingNotes.filter(
      (item) => item.id !== meetingId
    )
    element.meetingNotes = newMeetingNotes
    this.setState(() => {
      return { workspaceElements: oldList, trash: newTrashList }
    })
  }

  addNewJournal = (journal) => {
    const oldJournalList = [...this.state.journal]
    const newJournalList = [...oldJournalList, journal]
    this.setState(() => {
      return { journal: newJournalList }
    })
  }

  deleteJournal = (id) => {
    const oldJournalList = [...this.state.journal]
    const oldTrashList = [...this.state.trash]
    const journalToDelete = oldJournalList.find((item) => item.id === id)
    journalToDelete.type = 'Journal'
    let newTrashList = [...oldTrashList]
    newTrashList = [...newTrashList, journalToDelete]
    const newJournalList = oldJournalList.filter((item) => item.id !== id)
    this.setState(() => {
      return { journal: newJournalList, trash: newTrashList }
    })
  }

  editJournal = (id, journal) => {
    const oldJournalList = [...this.state.journal]
    const journalElement = oldJournalList.find((item) => item.id === id)
    journalElement.title = journal.title
    journalElement.createdBy = journal.createdBy
    journalElement.note = journal.note
    this.setState(() => {
      return { journal: oldJournalList }
    })
  }

  addNewNotes = (notes) => {
    const oldNotesList = [...this.state.notes]
    const newNotesList = [...oldNotesList, notes]
    this.setState(() => {
      return { notes: newNotesList }
    })
  }

  deleteNotes = (id) => {
    const oldnotesList = [...this.state.notes]
    const oldTrashList = [...this.state.trash]
    const noteToDelete = oldnotesList.find((item) => item.id === id)
    noteToDelete.type = 'Notes'
    let newTrashList = [...oldTrashList]
    newTrashList = [...newTrashList, noteToDelete]
    const newnotesList = oldnotesList.filter((item) => item.id !== id)

    this.setState(() => {
      return { notes: newnotesList, trash: newTrashList }
    })
  }

  deleteNotesPermanently = (id) => {
    const oldTrashList = [...this.state.trash]
    const newtrashList = oldTrashList.filter((item) => item.id !== id)
    this.setState(() => {
      return { trash: newtrashList }
    })
  }

  editNotes = (id, notes) => {
    const oldnotesList = [...this.state.notes]
    const notesElement = oldnotesList.find((item) => item.id === id)
    notesElement.title = notes.title
    notesElement.createdBy = notes.createdBy
    notesElement.note = notes.note
    this.setState(() => {
      return { notes: oldnotesList }
    })
  }

  addNewOngoingInternship = (internship) => {
    const oldInternships = [...this.state.internships]
    internship.status = 'ONGOING'
    const newInternships = [...oldInternships, internship]
    this.setState(() => {
      return { internships: newInternships }
    })
  }

  editOngoingInternship = (internship) => {
    const oldInternships = [...this.state.internships]
    const internshipToEdit = oldInternships.find(
      (item) => item.id === internship.id
    )
    internshipToEdit.title = internship.title
    internshipToEdit.company = internship.company
    internshipToEdit.startDate = internship.startDate
    internshipToEdit.description = internship.description
    internshipToEdit.links = internship.links
    internshipToEdit.docsList = internship.docsList
    internshipToEdit.docPreview = internship.docPreview
    internshipToEdit.completed = internship.completed
    this.setState(() => {
      return { internships: oldInternships }
    })
  }

  addNewAppliedInternship = (internship) => {
    const oldInternships = [...this.state.internships]
    if (internship.status === 'ONGOING') {
      internship.startDate = new Date()
    }
    const newInternships = [...oldInternships, internship]
    this.setState(() => {
      return { internships: newInternships }
    })
  }

  addNewInternshipTask = (internshipId, task) => {
    const oldInternships = [...this.state.internships]
    let oldTaskManager = [...this.state.taskManager]
    let selectedInternship = oldInternships.find(
      (item) => item.id === internshipId
    )
    selectedInternship.tasks = selectedInternship.tasks || []
    selectedInternship.tasks = [...selectedInternship.tasks, task]
    task.parent = 'Internships'
    if (task.status === 'To-do') {
      oldTaskManager[1] = [...oldTaskManager[1], task]
    }
    if (task.status === 'In-Progress') {
      oldTaskManager[2] = [...oldTaskManager[2], task]
    }
    if (task.status === 'Completed') {
      oldTaskManager[3] = [...oldTaskManager[3], task]
    }
    this.setState(() => {
      return { internships: oldInternships, taskManager: oldTaskManager }
    })
  }

  internshipTaskManipulation = (internshipId, taskId) => {
    const oldInternships = [...this.state.internships]
    let oldTaskManager = [...this.state.taskManager]
    const selectedInternship = oldInternships.find(
      (item) => item.id === internshipId
    )
    let selectedTask = selectedInternship.tasks.find(
      (item) => item.id === taskId
    )
    if (selectedTask.status === 'In-Progress') {
      const newInProgressList = oldTaskManager[2].filter(
        (item) => item.id !== taskId
      )
      oldTaskManager[2] = newInProgressList
    }
    if (selectedTask.status === 'To-do') {
      const newTodoList = oldTaskManager[1].filter((item) => item.id !== taskId)
      oldTaskManager[1] = newTodoList
    }
    if (selectedTask.status === 'Completed') {
      const newCompletedList = oldTaskManager[3].filter(
        (item) => item.id !== taskId
      )
      oldTaskManager[3] = newCompletedList
    }
    selectedTask.completed = !selectedTask.completed
    selectedTask.status = selectedTask.completed ? 'Completed' : 'To-do'
    if (selectedTask.status === 'Completed') {
      oldTaskManager[3] = [...oldTaskManager[3], selectedTask]
    }
    if (selectedTask.status === 'To-do') {
      oldTaskManager[1] = [...oldTaskManager[1], selectedTask]
    }
    this.setState(() => {
      return { internships: oldInternships, taskManager: oldTaskManager }
    })
  }

  handleInternshipStatus = (internshipId, status) => {
    const oldInternships = [...this.state.internships]
    let selectedInternship = oldInternships.find(
      (item) => item.id === internshipId
    )
    selectedInternship.status = status
    if (status === 'ONGOING') {
      selectedInternship.startDate = new Date()
    }
    this.setState(() => {
      return { internships: oldInternships }
    })
  }

  handleCompletionOfInternship = (internshipId) => {
    const oldInternships = [...this.state.internships]
    let selectedInternship = oldInternships.find(
      (item) => item.id === internshipId
    )
    selectedInternship.completed = !selectedInternship.completed
    this.setState(() => {
      return { internships: oldInternships }
    })
  }

  createTask = (task) => {
    const oldTaskManager = [...this.state.taskManager]
    let newTaskManager = [...oldTaskManager]
    task.parent = 'Task Manager'
    newTaskManager[0] = [...newTaskManager[0], task]
    this.setState(() => {
      return { taskManager: newTaskManager }
    })
  }

  editManagerTask = (taskId, taskToEdit) => {
    const newTaskManager = [...this.state.taskManager]
    let selectedTask = newTaskManager[0].find((item) => item.id === taskId)
    if (!selectedTask) {
      selectedTask = newTaskManager[1].find((item) => item.id === taskId)
      if (!selectedTask) {
        selectedTask = newTaskManager[2].find((item) => item.id === taskId)
        if (!selectedTask) {
          selectedTask = newTaskManager[3].find((item) => item.id === taskId)
        }
      }
    }
    selectedTask.title = taskToEdit.title
    selectedTask.createdBy = taskToEdit.createdBy
    selectedTask.dueDate = taskToEdit.dueDate
    selectedTask.description = taskToEdit.description
    selectedTask.docsList = taskToEdit.docsList
    selectedTask.links = taskToEdit.links

    this.setState(() => {
      return { taskManager: newTaskManager }
    })
  }

  handleStatusTaskManager = (taskId) => {
    let oldTaskManager = [...this.state.taskManager]
    let selectedTask = oldTaskManager[0]?.find((item) => item.id === taskId)
    let tempArray = 0
    if (!selectedTask) {
      selectedTask = oldTaskManager[1]?.find((item) => item.id === taskId)
      tempArray = 1
    }
    if (!selectedTask) {
      selectedTask = oldTaskManager[2]?.find((item) => item.id === taskId)
      tempArray = 2
    }
    if (!selectedTask) {
      selectedTask = oldTaskManager[3]?.find((item) => item.id === taskId)
      tempArray = 3
    }
    if (tempArray !== 3) {
      oldTaskManager[3] = [...oldTaskManager[3], selectedTask]
      selectedTask.completed = true
    }
    if (tempArray === 3) {
      selectedTask.completed = false
      oldTaskManager[1] = [...oldTaskManager[1], selectedTask]
    }

    let newSubArray = oldTaskManager[tempArray].filter(
      (item) => item.id !== taskId
    )
    oldTaskManager[tempArray] = newSubArray
    this.setState(() => {
      return { taskManager: oldTaskManager }
    })
  }

  switchTask = (subArray, taskId) => {
    let oldTaskManager = [...this.state.taskManager]
    let newTaskManager = [...oldTaskManager]
    let selectedTask
    let tempArray

    for (let i = 0; i <= 3; i++) {
      selectedTask = newTaskManager[i].find((item) => item.id === taskId)
      if (selectedTask) {
        tempArray = i
        break
      }
    }
    if (tempArray === 3) {
      selectedTask.completed = false
    }
    const newArray = newTaskManager[tempArray].filter(
      (item) => item.id !== taskId
    )
    if (subArray === 3) {
      selectedTask.completed = true
    }
    newTaskManager[tempArray] = newArray
    newTaskManager[subArray] = [...newTaskManager[subArray], selectedTask]

    oldTaskManager = newTaskManager
    this.setState(() => {
      return { taskManager: oldTaskManager }
    })
  }

  addNewDocumentShelf = (doc) => {
    const oldDocumentShelf = [...this.state.documentShelf]
    const newDocumentShelf = [...oldDocumentShelf, doc]
    this.setState(() => {
      return { documentShelf: newDocumentShelf }
    })
  }

  deleteDocumentShelf = (docId) => {
    const oldDocumentShelf = [...this.state.documentShelf]
    let newTrashList = [...this.state.trash]
    const selectedDoc = oldDocumentShelf.find((item) => item.id === docId)
    newTrashList = [...newTrashList, selectedDoc]
    let newDocumentShelf = oldDocumentShelf.filter((item) => item.id !== docId)
    this.setState(() => {
      return { documentShelf: newDocumentShelf, trash: newTrashList }
    })
  }

  deleteRecentsPermanently = (id) => {
    let oldTrashList = [...this.state.trash]
    oldTrashList = oldTrashList.filter((element) => element.id !== id)
    this.setState(() => {
      return { trash: oldTrashList }
    })
  }

  restoreFromTrash = (id) => {
    let newTrashList = [...this.state.trash]
    const itemToRestore = newTrashList.find((item) => item.id === id)
    let oldDocumentShelf = [...this.state.documentShelf]
    const tempWorkspaceList = [...this.state.workspaceList]
    const isAvailable = tempWorkspaceList.find(
      (item) => item.id === itemToRestore.workspaceID
    )
      ? true
      : false
    switch (itemToRestore.type) {
      case 'Workspace':
        this.restoreWorkspace(id)
        break

      case 'Space':
        if (isAvailable) {
          newTrashList = newTrashList.filter((element) => element.id !== id)
          this.setState(() => {
            return {
              trash: newTrashList,
              workspaceElements: [
                ...this.state.workspaceElements,
                itemToRestore,
              ],
            }
          })
        } else {
          alert('Parent unavailable! Please restore Parent Workspace first.')
        }
        break

      case 'Book':
        const isBookSpaceAvailable = this.state.workspaceElements.find(
          (item) => item.id === itemToRestore.spaceID
        )
        const isBookWorkspaceAvailable = this.state.workspaceList.find(
          (item) => item.id === isBookSpaceAvailable.workspaceID
        )
        if (isBookWorkspaceAvailable) {
          if (isBookSpaceAvailable) {
            newTrashList = newTrashList.filter((element) => element.id !== id)
            let newWorkspaceElements = [...this.state.workspaceElements]
            let selectedSpace = newWorkspaceElements.find(
              (item) => item.id === itemToRestore.spaceID
            )
            if (itemToRestore.favourite) {
              selectedSpace.favouriteBooks = [
                itemToRestore,
                ...selectedSpace.favouriteBooks,
              ]
              selectedSpace.bookShelf = [
                itemToRestore,
                ...selectedSpace.bookShelf,
              ]
            } else {
              selectedSpace.bookShelf = [
                itemToRestore,
                ...selectedSpace.bookShelf,
              ]
            }

            this.setState(() => {
              return {
                trash: newTrashList,
                workspaceElements: newWorkspaceElements,
              }
            })
          } else {
            alert('Parent unavailable! Please restore Parent Workspace first.')
          }
        } else {
          alert('Parent unavailable! Please restore Parent Workspace first.')
        }
        break

      case 'College Club':
        const isClubSpaceAvailable = this.state.workspaceElements.find(
          (item) => item.id === itemToRestore.spaceID
        )
        if (isClubSpaceAvailable) {
          const isClubWorkspaceAvailable = this.state.workspaceList.find(
            (item) => item.id === isClubSpaceAvailable.workspaceID
          )
          if (isClubWorkspaceAvailable) {
            newTrashList = newTrashList.filter((element) => element.id !== id)
            let newWorkspaceElements = [...this.state.workspaceElements]
            let selectedSpace = newWorkspaceElements.find(
              (item) => item.id === itemToRestore.spaceID
            )

            selectedSpace.clubs = [itemToRestore, ...selectedSpace.clubs]
            this.setState(() => {
              return {
                trash: newTrashList,
                workspaceElements: newWorkspaceElements,
              }
            })
          } else {
            alert('Parent unavailable! Please restore Parent Workspace first.')
          }
        } else {
          alert('Parent unavailable! Please restore Parent Workspace first.')
        }
        break

      case 'Club Idea':
        const isIdeaSpaceAvailable = this.state.workspaceElements.find(
          (item) => item.id === itemToRestore.spaceID
        )
        if (isIdeaSpaceAvailable) {
          const isIdeaClubAvailable = isIdeaSpaceAvailable.clubs.find(
            (item) => item.id === itemToRestore.clubID
          )
          if (isIdeaClubAvailable) {
            const isIdeaResourceAvailable = isIdeaClubAvailable.resources.find(
              (item) => item.id === itemToRestore.resourceID
            )
            if (isIdeaResourceAvailable) {
              const isIdeaWorkspaceAvailable = this.state.workspaceList.find(
                (item) => item.id === isIdeaSpaceAvailable.workspaceID
              )
              if (isIdeaWorkspaceAvailable) {
                newTrashList = newTrashList.filter(
                  (element) => element.id !== id
                )
                let newWorkspaceElements = [...this.state.workspaceElements]
                const selectedSpace = newWorkspaceElements.find(
                  (item) => item.id === itemToRestore.spaceID
                )
                const selectedClub = selectedSpace.clubs.find(
                  (item) => item.id === itemToRestore.clubID
                )
                let selectedResource = selectedClub.resources.find(
                  (item) => item.id === itemToRestore.resourceID
                )
                selectedResource.ideas = [
                  itemToRestore,
                  ...selectedResource.ideas,
                ]
                this.setState(() => {
                  return {
                    trash: newTrashList,
                    workspaceElements: newWorkspaceElements,
                  }
                })
              } else {
                alert(
                  'Parent unavailable! Please restore Parent Workspace first.'
                )
              }
            } else {
              alert(
                'Parent unavailable! Please restore Parent Workspace first.'
              )
            }
          } else {
            alert('Parent unavailable! Please restore Parent Workspace first.')
          }
        } else {
          alert('Parent unavailable! Please restore Parent Workspace first.')
        }
        break

      case 'Club Meeting':
        const isMeetingSpaceAvailable = this.state.workspaceElements.find(
          (item) => item.id === itemToRestore.spaceID
        )
        if (isMeetingSpaceAvailable) {
          const isMeetingClubAvailable = isMeetingSpaceAvailable.clubs.find(
            (item) => item.id === itemToRestore.clubID
          )
          if (isMeetingClubAvailable) {
            const isMeetingResourceAvailable =
              isMeetingClubAvailable.resources.find(
                (item) => item.id === itemToRestore.resourceID
              )
            if (isMeetingResourceAvailable) {
              const isMeetingWorkspaceAvailable = this.state.workspaceList.find(
                (item) => item.id === isMeetingSpaceAvailable.workspaceID
              )
              if (isMeetingWorkspaceAvailable) {
                newTrashList = newTrashList.filter(
                  (element) => element.id !== id
                )
                let newWorkspaceElements = [...this.state.workspaceElements]
                const selectedSpace = newWorkspaceElements.find(
                  (item) => item.id === itemToRestore.spaceID
                )
                const selectedClub = selectedSpace.clubs.find(
                  (item) => item.id === itemToRestore.clubID
                )
                let selectedResource = selectedClub.resources.find(
                  (item) => item.id === itemToRestore.resourceID
                )
                selectedResource.meetings = [
                  itemToRestore,
                  ...selectedResource.meetings,
                ]
                this.setState(() => {
                  return {
                    trash: newTrashList,
                    workspaceElements: newWorkspaceElements,
                  }
                })
              } else {
                alert(
                  'Parent unavailable! Please restore Parent Workspace first.'
                )
              }
            } else {
              alert(
                'Parent unavailable! Please restore Parent Workspace first.'
              )
            }
          } else {
            alert('Parent unavailable! Please restore Parent Workspace first.')
          }
        } else {
          alert('Parent unavailable! Please restore Parent Workspace first.')
        }
        break

      case 'Club Finance':
        const isFinanceSpaceAvailable = this.state.workspaceElements.find(
          (item) => item.id === itemToRestore.spaceID
        )
        if (isFinanceSpaceAvailable) {
          const isFinanceClubAvailable = isFinanceSpaceAvailable.clubs.find(
            (item) => item.id === itemToRestore.clubID
          )
          if (isFinanceClubAvailable) {
            const isFinanceResourceAvailable =
              isFinanceClubAvailable.resources.find(
                (item) => item.id === itemToRestore.resourceID
              )
            if (isFinanceResourceAvailable) {
              const isFinanceWorkspaceAvailable = this.state.workspaceList.find(
                (item) => item.id === isFinanceSpaceAvailable.workspaceID
              )
              if (isFinanceWorkspaceAvailable) {
                newTrashList = newTrashList.filter(
                  (element) => element.id !== id
                )
                let newWorkspaceElements = [...this.state.workspaceElements]
                const selectedSpace = newWorkspaceElements.find(
                  (item) => item.id === itemToRestore.spaceID
                )
                const selectedClub = selectedSpace.clubs.find(
                  (item) => item.id === itemToRestore.clubID
                )
                let selectedResource = selectedClub.resources.find(
                  (item) => item.id === itemToRestore.resourceID
                )
                selectedResource.finances = [
                  itemToRestore,
                  ...selectedResource.finances,
                ]
                this.setState(() => {
                  return {
                    trash: newTrashList,
                    workspaceElements: newWorkspaceElements,
                  }
                })
              } else {
                alert(
                  'Parent unavailable! Please restore Parent Workspace first.'
                )
              }
            } else {
              alert(
                'Parent unavailable! Please restore Parent Workspace first.'
              )
            }
          } else {
            alert('Parent unavailable! Please restore Parent Workspace first.')
          }
        } else {
          alert('Parent unavailable! Please restore Parent Workspace first.')
        }
        break

      case 'Club Contact':
        const isContactSpaceAvailable = this.state.workspaceElements.find(
          (item) => item.id === itemToRestore.spaceID
        )
        if (isContactSpaceAvailable) {
          const isContactClubAvailable = isContactSpaceAvailable.clubs.find(
            (item) => item.id === itemToRestore.clubID
          )
          if (isContactClubAvailable) {
            const isContactResourceAvailable =
              isContactClubAvailable.resources.find(
                (item) => item.id === itemToRestore.resourceID
              )
            if (isContactResourceAvailable) {
              const isContactWorkspaceAvailable = this.state.workspaceList.find(
                (item) => item.id === isContactSpaceAvailable.workspaceID
              )
              if (isContactWorkspaceAvailable) {
                newTrashList = newTrashList.filter(
                  (element) => element.id !== id
                )
                let newWorkspaceElements = [...this.state.workspaceElements]
                const selectedSpace = newWorkspaceElements.find(
                  (item) => item.id === itemToRestore.spaceID
                )
                const selectedClub = selectedSpace.clubs.find(
                  (item) => item.id === itemToRestore.clubID
                )
                let selectedResource = selectedClub.resources.find(
                  (item) => item.id === itemToRestore.resourceID
                )
                selectedResource.contacts = [
                  itemToRestore,
                  ...selectedResource.contacts,
                ]
                this.setState(() => {
                  return {
                    trash: newTrashList,
                    workspaceElements: newWorkspaceElements,
                  }
                })
              } else {
                alert(
                  'Parent unavailable! Please restore Parent Workspace first.'
                )
              }
            } else {
              alert(
                'Parent unavailable! Please restore Parent Workspace first.'
              )
            }
          } else {
            alert('Parent unavailable! Please restore Parent Workspace first.')
          }
        } else {
          alert('Parent unavailable! Please restore Parent Workspace first.')
        }
        break

      case 'Moodboard':
        const isMoodboardSpaceAvailable = this.state.workspaceElements.find(
          (item) => item.id === itemToRestore.spaceID
        )
        if (isMoodboardSpaceAvailable) {
          const isMoodboardWorkspaceAvailable = this.state.workspaceList.find(
            (item) => item.id === isMoodboardSpaceAvailable.workspaceID
          )
          if (isMoodboardWorkspaceAvailable) {
            newTrashList = newTrashList.filter((element) => element.id !== id)
            let newWorkspaceElements = [...this.state.workspaceElements]
            let selectedSpace = newWorkspaceElements.find(
              (item) => item.id === itemToRestore.spaceID
            )

            selectedSpace.moodboards = [
              itemToRestore,
              ...selectedSpace.moodboards,
            ]
            this.setState(() => {
              return {
                trash: newTrashList,
                workspaceElements: newWorkspaceElements,
              }
            })
          } else {
            alert('Parent unavailable! Please restore Parent Workspace first.')
          }
        } else {
          alert('Parent unavailable! Please restore Parent Workspace first.')
        }
        break

      case 'Digital Brainboard':
        const isBrainboardSpaceAvailable = this.state.workspaceElements.find(
          (item) => item.id === itemToRestore.spaceID
        )
        if (isBrainboardSpaceAvailable) {
          const isBrainboardWorkspaceAvailable = this.state.workspaceList.find(
            (item) => item.id === isBrainboardSpaceAvailable.workspaceID
          )
          if (isBrainboardWorkspaceAvailable) {
            newTrashList = newTrashList.filter((element) => element.id !== id)
            let newWorkspaceElements = [...this.state.workspaceElements]
            let selectedSpace = newWorkspaceElements.find(
              (item) => item.id === itemToRestore.spaceID
            )

            selectedSpace.digitalBrainboards = [
              itemToRestore,
              ...selectedSpace.digitalBrainboards,
            ]
            this.setState(() => {
              return {
                trash: newTrashList,
                workspaceElements: newWorkspaceElements,
              }
            })
          } else {
            alert('Parent unavailable! Please restore Parent Workspace first.')
          }
        } else {
          alert('Parent unavailable! Please restore Parent Workspace first.')
        }
        break

      case 'Docs':
        const isDocsSpaceAvailable = this.state.workspaceElements.find(
          (item) => item.id === itemToRestore.spaceID
        )
        if (isDocsSpaceAvailable) {
          const isDocsWorkspaceAvailable = this.state.workspaceList.find(
            (item) => item.id === isDocsSpaceAvailable.workspaceID
          )
          if (isDocsWorkspaceAvailable) {
            newTrashList = newTrashList.filter((element) => element.id !== id)
            let newWorkspaceElements = [...this.state.workspaceElements]
            let selectedSpace = newWorkspaceElements.find(
              (item) => item.id === itemToRestore.spaceID
            )

            selectedSpace.docsList = [itemToRestore, ...selectedSpace.docsList]
            this.setState(() => {
              return {
                trash: newTrashList,
                workspaceElements: newWorkspaceElements,
              }
            })
          } else {
            alert('Parent unavailable! Please restore Parent Workspace first.')
          }
        } else {
          alert('Parent unavailable! Please restore Parent Workspace first.')
        }
        break

      case 'Notes':
        newTrashList = newTrashList.filter((element) => element.id !== id)
        let oldNotesList = [...this.state.notes]
        oldNotesList = [...oldNotesList, itemToRestore]

        this.setState(() => {
          return { trash: newTrashList, notes: oldNotesList }
        })
        break

      case 'Journal':
        newTrashList = newTrashList.filter((element) => element.id !== id)
        let oldJournalList = [...this.state.journal]
        oldJournalList = [...oldJournalList, itemToRestore]
        this.setState(() => {
          return { trash: newTrashList, journal: oldJournalList }
        })
        break

      case 'Meeting Notes':
        const isMeetingNotesSpaceAvailable = this.state.workspaceElements.find(
          (item) => item.id === itemToRestore.spaceID
        )
        if (isMeetingNotesSpaceAvailable) {
          const isMeetingNotesWorkspaceAvailable =
            this.state.workspaceList.find(
              (item) => item.id === isMeetingNotesSpaceAvailable.workspaceID
            )
          if (isMeetingNotesWorkspaceAvailable) {
            newTrashList = newTrashList.filter((element) => element.id !== id)
            let newWorkspaceElements = [...this.state.workspaceElements]
            let selectedSpace = newWorkspaceElements.find(
              (item) => item.id === itemToRestore.spaceID
            )

            selectedSpace.meetingNotes = [
              itemToRestore,
              ...selectedSpace.meetingNotes,
            ]
            this.setState(() => {
              return {
                trash: newTrashList,
                workspaceElements: newWorkspaceElements,
              }
            })
          } else {
            alert('Parent unavailable! Please restore Parent Workspace first.')
          }
        } else {
          alert('Parent unavailable! Please restore Parent Workspace first.')
        }
        break

      case 'Workshop':
        const isWorkshopSpaceAvailable = this.state.workspaceElements.find(
          (item) => item.id === itemToRestore.spaceID
        )
        if (isWorkshopSpaceAvailable) {
          const isWorkshopWorkspaceAvailable = this.state.workspaceList.find(
            (item) => item.id === isWorkshopSpaceAvailable.workspaceID
          )
          if (isWorkshopWorkspaceAvailable) {
            newTrashList = newTrashList.filter((element) => element.id !== id)
            let newWorkspaceElements = [...this.state.workspaceElements]
            let selectedSpace = newWorkspaceElements.find(
              (item) => item.id === itemToRestore.spaceID
            )

            selectedSpace.workshops = [
              itemToRestore,
              ...selectedSpace.workshops,
            ]
            this.setState(() => {
              return {
                trash: newTrashList,
                workspaceElements: newWorkspaceElements,
              }
            })
          } else {
            alert('Parent unavailable! Please restore Parent Workspace first.')
          }
        } else {
          alert('Parent unavailable! Please restore Parent Workspace first.')
        }
        break

      case 'Bucket List':
        const isBucketSpaceAvailable = this.state.workspaceElements.find(
          (item) => item.id === itemToRestore.spaceID
        )
        if (isBucketSpaceAvailable) {
          const isBucketWorkspaceAvailable = this.state.workspaceList.find(
            (item) => item.id === isBucketSpaceAvailable.workspaceID
          )
          if (isBucketWorkspaceAvailable) {
            newTrashList = newTrashList.filter((element) => element.id !== id)
            let newWorkspaceElements = [...this.state.workspaceElements]
            let selectedSpace = newWorkspaceElements.find(
              (item) => item.id === itemToRestore.spaceID
            )

            selectedSpace.bucketList = [
              itemToRestore,
              ...selectedSpace.bucketList,
            ]
            this.setState(() => {
              return {
                trash: newTrashList,
                workspaceElements: newWorkspaceElements,
              }
            })
          } else {
            alert('Parent unavailable! Please restore Parent Workspace first.')
          }
        } else {
          alert('Parent unavailable! Please restore Parent Workspace first.')
        }
        break

      case 'Bucket Image':
        const isBucketImageSpaceAvailable = this.state.workspaceElements.find(
          (item) => item.id === itemToRestore.spaceID
        )
        if (isBucketImageSpaceAvailable) {
          const isBucketImageWorkspaceAvailable = this.state.workspaceList.find(
            (item) => item.id === isBucketImageSpaceAvailable.workspaceID
          )
          if (isBucketImageWorkspaceAvailable) {
            const isBucketImageBucketAvailable =
              isBucketImageSpaceAvailable.bucketList.find(
                (item) => item.id === itemToRestore.bucketID
              )
            if (isBucketImageBucketAvailable) {
              this.restoreBucketImage(
                isBucketImageSpaceAvailable.workspaceID,
                itemToRestore.spaceID,
                itemToRestore.bucketID,
                itemToRestore.previewId
              )
            } else {
              alert(
                'Parent unavailable! Please restore Parent Workspace first.'
              )
            }
          } else {
            alert('Parent unavailable! Please restore Parent Workspace first.')
          }
        } else {
          alert('Parent unavailable! Please restore Parent Workspace first.')
        }
        break

      case 'Habit':
        const isHabitSpaceAvailable = this.state.workspaceElements.find(
          (item) => item.id === itemToRestore.spaceID
        )
        if (isHabitSpaceAvailable) {
          const isHabitWorkspaceAvailable = this.state.workspaceList.find(
            (item) => item.id === isHabitSpaceAvailable.workspaceID
          )
          if (isHabitWorkspaceAvailable) {
            newTrashList = newTrashList.filter((element) => element.id !== id)
            let newWorkspaceElements = [...this.state.workspaceElements]
            let selectedSpace = newWorkspaceElements.find(
              (item) => item.id === itemToRestore.spaceID
            )

            selectedSpace.habits = [itemToRestore, ...selectedSpace.habits]
            this.setState(() => {
              return {
                trash: newTrashList,
                workspaceElements: newWorkspaceElements,
              }
            })
          } else {
            alert('Parent unavailable! Please restore Parent Workspace first.')
          }
        } else {
          alert('Parent unavailable! Please restore Parent Workspace first.')
        }
        break

      case 'Marksheet':
        newTrashList = newTrashList.filter((element) => element.id !== id)

        oldDocumentShelf = [...oldDocumentShelf, itemToRestore]
        this.setState(() => {
          return { trash: newTrashList, documentShelf: oldDocumentShelf }
        })
        break

      case 'Certificate':
        newTrashList = newTrashList.filter((element) => element.id !== id)

        oldDocumentShelf = [...oldDocumentShelf, itemToRestore]
        this.setState(() => {
          return { trash: newTrashList, documentShelf: oldDocumentShelf }
        })
        break

      case 'Important':
        newTrashList = newTrashList.filter((element) => element.id !== id)

        oldDocumentShelf = [...oldDocumentShelf, itemToRestore]
        this.setState(() => {
          return { trash: newTrashList, documentShelf: oldDocumentShelf }
        })
        break

      case 'OtherDocument':
        newTrashList = newTrashList.filter((element) => element.id !== id)

        oldDocumentShelf = [...oldDocumentShelf, itemToRestore]
        this.setState(() => {
          return { trash: newTrashList, documentShelf: oldDocumentShelf }
        })
        break

      default:
        console.log('nothing to restore')
    }
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
          editSpace: this.editSpace,
          deleteSpace: this.deleteSpace,
          handleDetailSpace: this.handleDetailSpace,
          addBook: this.addBook,
          deleteBook: this.deleteBook,
          toggleFavourite: this.toggleFavourite,
          addNewSubject: this.addNewSubject,
          editSubject: this.editSubject,
          addNewClub: this.addNewClub,
          editClub: this.editClub,
          deleteClub: this.deleteClub,
          addNewResource: this.addNewResource,
          addTask: this.addTask,
          taskManipulation: this.taskManipulation,
          deleteTask: this.deleteTask,
          deleteLinkFromTasks: this.deleteLinkFromTasks,
          deleteDocFromTasks: this.deleteDocFromTasks,
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
          editBasicsDigitalBrainboard: this.editBasicsDigitalBrainboard,
          editDigitalBrainboard: this.editDigitalBrainboard,
          addMoodboardField: this.addMoodboardField,
          editMoodboard: this.editMoodboard,
          deleteMoodboardField: this.deleteMoodboardField,
          addNewHabit: this.addNewHabit,
          addNewHabitField: this.addNewHabitField,
          deleteHabit: this.deleteHabit,
          handleStatusOfHabit: this.handleStatusOfHabit,
          addNewWorkshop: this.addNewWorkshop,
          editWorkshop: this.editWorkshop,
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
          addNewOtherOption: this.addNewOtherOption,
          editOtherOption: this.editOtherOption,
          deleteOtherOption: this.deleteOtherOption,
          addTodo: this.addTodo,
          deleteTodo: this.deleteTodo,
          editTodo: this.editTodo,
          deleteDocFromTodo: this.deleteDocFromTodo,
          deleteLinkFromTodo: this.deleteLinkFromTodo,
          todoManipulation: this.todoManipulation,
          addBucketList: this.addBucketList,
          editBucketList: this.editBucketList,
          deleteBucketList: this.deleteBucketList,
          deleteBucketImage: this.deleteBucketImage,
          restoreBucketImage: this.restoreBucketImage,
          deleteBucketImagePermanently: this.deleteBucketImagePermanently,
          addNewDocs: this.addNewDocs,
          editDocs: this.editDocs,
          deleteDocs: this.deleteDocs,
          deleteDocsPermanently: this.deleteDocsPermanently,
          addNewMeetingNotes: this.addNewMeetingNotes,
          deleteMeetingNotes: this.deleteMeetingNotes,
          editMeetingNotes: this.editMeetingNotes,
          addNewJournal: this.addNewJournal,
          deleteJournal: this.deleteJournal,
          editJournal: this.editJournal,
          addNewNotes: this.addNewNotes,
          deleteNotes: this.deleteNotes,
          editNotes: this.editNotes,
          deleteNotesPermanently: this.deleteNotesPermanently,
          addNewOngoingInternship: this.addNewOngoingInternship,
          editOngoingInternship: this.editOngoingInternship,
          addNewAppliedInternship: this.addNewAppliedInternship,
          addNewInternshipTask: this.addNewInternshipTask,
          internshipTaskManipulation: this.internshipTaskManipulation,
          handleInternshipStatus: this.handleInternshipStatus,
          handleCompletionOfInternship: this.handleCompletionOfInternship,
          createTask: this.createTask,
          editManagerTask: this.editManagerTask,
          handleStatusTaskManager: this.handleStatusTaskManager,
          switchTask: this.switchTask,
          addNewDocumentShelf: this.addNewDocumentShelf,
          deleteDocumentShelf: this.deleteDocumentShelf,
          deleteRecentsPermanently: this.deleteRecentsPermanently,
          restoreFromTrash: this.restoreFromTrash,
        }}
      >
        {this.props.children}
      </WorkspaceContext.Provider>
    )
  }
}

const WorkspaceConsumer = WorkspaceContext.Consumer

export { WorkspaceProvider, WorkspaceConsumer }
