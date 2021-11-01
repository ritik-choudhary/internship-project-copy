import React from 'react'
import AcademicAdvisor from '../../assets/coverletters/Academic Advisor.txt'
import AcademicCoach from '../../assets/coverletters/Academic Coach.txt'
import AcademicTutor from '../../assets/coverletters/Academic Tutor.txt'
import AccountExecutive from '../../assets/coverletters/Account Executive.txt'
import AccountManager from '../../assets/coverletters/Account Manager.txt'
import Accountant from '../../assets/coverletters/Accountant.txt'
import AccountingIntern from '../../assets/coverletters/Accounting Intern.txt'
import AccountingManager from '../../assets/coverletters/Accounting Manager.txt'
import Actor from '../../assets/coverletters/Actor.txt'
import Administrator from '../../assets/coverletters/Administrator.txt'
import AdmissionCounsellor from '../../assets/coverletters/Admission Counsellor.txt'
import Analyst from '../../assets/coverletters/Analyst.txt'
import Architect from '../../assets/coverletters/Architect.txt'
import ArtTeacher from '../../assets/coverletters/Art Teacher.txt'
import AssistantBuyer from '../../assets/coverletters/Assistant Buyer.txt'
import Attorney from '../../assets/coverletters/Attorney.txt'
import AutocenterManager from '../../assets/coverletters/Autocenter Manager.txt'
import AutomotiveSalesManager from '../../assets/coverletters/Automotive sales Manager.txt'
import Babysitter from '../../assets/coverletters/Babysitter.txt'
import BankManager from '../../assets/coverletters/Bank Manager.txt'
import Banker from '../../assets/coverletters/Banker.txt'
import Bartender from '../../assets/coverletters/Bartender.txt'
import BidWriter from '../../assets/coverletters/Bid Writer.txt'
import BookKeeper from '../../assets/coverletters/Book Keeper.txt'
import BusinessAnalyst from '../../assets/coverletters/Business Analyst.txt'
import BusinessSupportManager from '../../assets/coverletters/Business Supprt Manager.txt'
import CareerAdvisor from '../../assets/coverletters/Career Advisor.txt'
// import CaseManager from '../../assets/coverletters/Case Manager.txt'
// import Chef from '../../assets/coverletters/Chef.txt'
// import Chiropractor from '../../assets/coverletters/Chiropractor.txt'
// import CivilEngineer from '../../assets/coverletters/Civil Engineer.txt'
// import Consultant from '../../assets/coverletters/Consultant.txt'
// import Copywriter from '../../assets/coverletters/Copywriter.txt'
// import Cosmetologist from '../../assets/coverletters/Cosmetologist.txt'
// import Counselor from '../../assets/coverletters/Counselor.txt'
// import CreditAnalyst from '../../assets/coverletters/Credit Analyst.txt'
// import CurriculumDeveloper from '../../assets/coverletters/Curriculum Developer.txt'
// import Custodian from '../../assets/coverletters/Custodian.txt'
// import CustomerExperienceManager from '../../assets/coverletters/Customer Experience Manager.txt'
// import CustomerServiceRepresentative from '../../assets/coverletters/Customer Service Representative.txt'
// import DataAnalyst from '../../assets/coverletters/Data analyst.txt'
// import DataScientist from '../../assets/coverletters/Data Scientist.txt'
// import DatabaseAnalyst from '../../assets/coverletters/Database analyst.txt'
// import DentalAssistant from '../../assets/coverletters/Dental assistant.txt'
// import DentalHygienist from '../../assets/coverletters/Dental Hygienist.txt'
// import Dentist from '../../assets/coverletters/Dentist.txt'
// import DesignManager from '../../assets/coverletters/Design manager.txt'
// import Designer from '../../assets/coverletters/Designer.txt'
// import DistributionManager from '../../assets/coverletters/Distribution Manager.txt'
// import Ecologist from '../../assets/coverletters/Ecologist.txt'
// import ElectricalEnginner from '../../assets/coverletters/Electrical enginner.txt'
// import Engineer from '../../assets/coverletters/Engineer.txt'
// import EngineeringIntern from '../../assets/coverletters/Engineering Intern.txt'
// import Esthecian from '../../assets/coverletters/Esthecian.txt'
// import EventCoordinator from '../../assets/coverletters/Event Coordinator.txt'
// import EventManager from '../../assets/coverletters/Event Manager.txt'
// import EventPlanner from '../../assets/coverletters/Event Planner.txt'
// import ExecutiveAssistant from '../../assets/coverletters/Executive Assistant.txt'
// import FinanceIntern from '../../assets/coverletters/Finance Intern.txt'
// import FinancialAnalyst from '../../assets/coverletters/Financial Analyst.txt'
// import FlightAttendant from '../../assets/coverletters/Fligh attendant.txt'
// import FreelanceWriter from '../../assets/coverletters/Freelance writer.txt'
// import GraduateAssistant from '../../assets/coverletters/Graduate Assistant.txt'
// import GraphicDesigner from '../../assets/coverletters/Graphic Designer.txt'
// import HeadofMarketing from '../../assets/coverletters/Head of marketing.txt'
// import HeadofOperations from '../../assets/coverletters/Head of operations.txt'
// import HRassistant from '../../assets/coverletters/HR assistant.txt'
// import HRgeneralist from '../../assets/coverletters/HR generalist.txt'
// import HRManager from '../../assets/coverletters/HR Manager.txt'
// import Intern from '../../assets/coverletters/Intern.txt'
// import ITProjectManager from '../../assets/coverletters/IT project manager.txt'
// import LabTechnician from '../../assets/coverletters/Lab technician.txt'
// import LeadCaseManager from '../../assets/coverletters/Lead Case manager.txt'
// import LegalAssistant from '../../assets/coverletters/Legal assistant.txt'
// import LegalIntern from '../../assets/coverletters/Legal Intern.txt'
// import Librarian from '../../assets/coverletters/Librarian.txt'
// import ManagementConsultant from '../../assets/coverletters/Management Consultant.txt'
// import Manager from '../../assets/coverletters/Manager.txt'
// import Marketer from '../../assets/coverletters/Marketer.txt'
// import MarketingCoordinator from '../../assets/coverletters/Marketing Coordinator.txt'
// import MarketingIntern from '../../assets/coverletters/Marketing Intern.txt'
// import MarketingManager from '../../assets/coverletters/Marketing Manager.txt'
// import Marketing from '../../assets/coverletters/Marketing.txt'
// import MechanicalEngineer from '../../assets/coverletters/Mechanical Engineer.txt'
// import MedicalAssistant from '../../assets/coverletters/Medical Assistant.txt'
// import MedicalReceptionist from '../../assets/coverletters/Medical receptionist.txt'
// import Microbiologist from '../../assets/coverletters/Microbiologist.txt'
// import Nanny from '../../assets/coverletters/Nanny.txt'
// import Nurse from '../../assets/coverletters/Nurse.txt'
// import NursingAssistant from '../../assets/coverletters/Nursing assistant.txt'
// import OccupationalTherapist from '../../assets/coverletters/Occupational therapist.txt'
// import OfficeAdministrator from '../../assets/coverletters/Office administrator.txt'
// import OfficeAssistant from '../../assets/coverletters/Office assistant.txt'
// import OfficeManager from '../../assets/coverletters/Office manager.txt'
// import OperationsManager from '../../assets/coverletters/Operations manager.txt'
// import OutreachWorker from '../../assets/coverletters/Outreach worker.txt'
// import Paralegal from '../../assets/coverletters/Paralegal.txt'
// import PartenershipManager from '../../assets/coverletters/Partenership manager.txt'
// import PartsAdvisor from '../../assets/coverletters/Parts advisor.txt'
// import PersonalAssistant from '../../assets/coverletters/Personal assistant.txt'
// import PersonalBanker from '../../assets/coverletters/Personal banker.txt'
// import Pharmacist from '../../assets/coverletters/Pharmacist.txt'
// import PharmacyTechnician from '../../assets/coverletters/Pharmacy technician.txt'
// import Photographer from '../../assets/coverletters/Photographer.txt'
// import PhysicalTherapist from '../../assets/coverletters/Physical therapist.txt'
// import Physician from '../../assets/coverletters/Physician.txt'
// import Pilot from '../../assets/coverletters/Pilot.txt'
// import PlatformEngineer from '../../assets/coverletters/Platform Enginner.txt'
// import Praprofessional from '../../assets/coverletters/Praprofessional.txt'
// import PreSchoolTeacher from '../../assets/coverletters/Pre school teacher.txt'
// import ProductManager from '../../assets/coverletters/Product manager.txt'
// import ProgramManager from '../../assets/coverletters/Program manager.txt'
// import ProjectCoordinator from '../../assets/coverletters/Project Coordinator.txt'
// import ProjectManager from '../../assets/coverletters/Project manager.txt'
// import PropertyManager from '../../assets/coverletters/Property manager.txt'
// import Psychologist from '../../assets/coverletters/Psychologist.txt'
// import QualityManager from '../../assets/coverletters/Quality manager.txt'
// import Receptionist from '../../assets/coverletters/Receptionist.txt'
// import Recruiter from '../../assets/coverletters/Recruiter.txt'
// import RecruitmentCoordinator from '../../assets/coverletters/Recruitment coordinator.txt'
// import RecruitmentManager from '../../assets/coverletters/Recruitment manager.txt'
// import RegionalOperationsManager from '../../assets/coverletters/Regional operations manager.txt'
// import ResearchAssistant from '../../assets/coverletters/Research assistant.txt'
// import RiskManager from '../../assets/coverletters/Risk manager.txt'
// import SalesManager from '../../assets/coverletters/Sales manager.txt'
// import SalesRepresentative from '../../assets/coverletters/Sales representative.txt'
// import Sales from '../../assets/coverletters/Sales.txt'
// import SchoolCounselor from '../../assets/coverletters/School Counselor.txt'
// import Scientist from '../../assets/coverletters/Scientist.txt'
// import Secretary from '../../assets/coverletters/Secretary.txt'
// import SecurityGuard from '../../assets/coverletters/Security guard.txt'
// import SecurityOfficer from '../../assets/coverletters/Security officer.txt'
// import ServiceCoordinator from '../../assets/coverletters/Service coordinator.txt'
// import SocialMediaMarketing from '../../assets/coverletters/Social media marketing.txt'
// import SocialWorker from '../../assets/coverletters/Social worker.txt'
// import SoftwareDeveloper from '../../assets/coverletters/Software developer.txt'
// import SoftwareEngineer from '../../assets/coverletters/Software Engineer.txt'
// import SpecialEducationTeacher from '../../assets/coverletters/Special education teacher.txt'
// import SpeechLanguagePathalogist from '../../assets/coverletters/Speech language pathologist.txt'
// import TeachingAssistant from '../../assets/coverletters/Teaching assistant.txt'
// import TechnicalSupport from '../../assets/coverletters/Technical support.txt'
// import TrainingCoordinator from '../../assets/coverletters/Training coordinator.txt'
// import Veterinarian from '../../assets/coverletters/Veterinarian.txt'
// import WebDeveloper from '../../assets/coverletters/Web developer.txt'
// import Writer from '../../assets/coverletters/Writer.txt'

export const TEMPLATES = [
  {
    id: '1',
    name: 'Academic Advisor',
    file: AcademicAdvisor,
  },
  {
    id: '2',
    name: 'Academic Coach',
    file: AcademicCoach,
  },
  {
    id: '3',
    name: 'Academic Tutor',
    file: AcademicTutor,
  },
  {
    id: '4',
    name: 'Account Executive',
    file: AccountExecutive,
  },
  {
    id: '5',
    name: 'Account Manager',
    file: AccountManager,
  },
  {
    id: '6',
    name: 'Accountant',
    file: Accountant,
  },
  {
    id: '7',
    name: 'Accounting Intern',
    file: AccountingIntern,
  },
  {
    id: '8',
    name: 'Accounting Manager',
    file: AccountingManager,
  },
  {
    id: '9',
    name: 'Actor',
    file: Actor,
  },
  {
    id: '10',
    name: 'Administrator',
    file: Administrator,
  },
  {
    id: '11',
    name: 'Admission Counsellor',
    file: AdmissionCounsellor,
  },
  {
    id: '12',
    name: 'Analyst',
    file: Analyst,
  },
  {
    id: '13',
    name: 'Architect',
    file: Architect,
  },
  {
    id: '14',
    name: 'Art Teacher',
    file: ArtTeacher,
  },
  {
    id: '15',
    name: 'Assistant Buyer',
    file: AssistantBuyer,
  },
  {
    id: '16',
    name: 'Attorney',
    file: Attorney,
  },
  {
    id: '17',
    name: 'Autocenter Manager',
    file: AutocenterManager,
  },
  {
    id: '18',
    name: 'Automotive Sales Manager',
    file: AutomotiveSalesManager,
  },
  {
    id: '19',
    name: 'Babysitter',
    file: Babysitter,
  },
  {
    id: '20',
    name: 'Bank Manager',
    file: BankManager,
  },
  {
    id: '21',
    name: 'Banker',
    file: Banker,
  },
  {
    id: '22',
    name: 'Bartender',
    file: Bartender,
  },
  {
    id: '23',
    name: 'Bid Writer',
    file: BidWriter,
  },
  {
    id: '24',
    name: 'Book Keeper',
    file: BookKeeper,
  },
  {
    id: '25',
    name: 'Business Analyst',
    file: BusinessAnalyst,
  },
  {
    id: '26',
    name: 'Business Support Manager',
    file: BusinessSupportManager,
  },
  {
    id: '27',
    name: 'Career Advisor',
    file: CareerAdvisor,
  },
]
