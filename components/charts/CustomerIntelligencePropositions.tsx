'use client'

import { useState } from 'react'

// ============================================================
// DEMO DATA
// ============================================================

interface Proposition1Row {
  customerName: string
  typeOfBusiness: string
  primaryApplicationType: string
  facilityType: string
  installedAnalyzerCapacity: string
  numberOfAnalyzerSystems: string
  keyContactPerson: string
  designationRole: string
  emailAddress: string
  phoneWhatsApp: string
  linkedInProfile: string
  websiteURL: string
}

interface Proposition2Row extends Proposition1Row {
  annualProcurementBudget: string
  preferredProcurementModel: string
  averageLeadTime: string
  replacementCycle: string
}

interface Proposition3Row extends Proposition2Row {
  levelOfAutomation: string
  percentDCSIntegration: string
  useOfAI: string
  predictiveMaintenanceAdoption: string
  remoteDiagnostics: string
  plannedCapacityExpansion: string
  expectedNewPurchases: string
  newApplicationAreas: string
  newFacilityConstruction: string
  benchmarkingSummary: string
  additionalComments: string
}

const proposition1Data: Proposition1Row[] = [
  {
    customerName: 'ExxonMobil Refining',
    typeOfBusiness: 'Oil & Gas Operator',
    primaryApplicationType: 'Gas Analysis',
    facilityType: 'Refinery',
    installedAnalyzerCapacity: '450',
    numberOfAnalyzerSystems: '38',
    keyContactPerson: 'James Henderson',
    designationRole: 'VP Instrumentation',
    emailAddress: 'j.henderson@exxonmobil.com',
    phoneWhatsApp: '+1-713-555-0142',
    linkedInProfile: 'linkedin.com/in/jameshenderson',
    websiteURL: 'exxonmobil.com'
  },
  {
    customerName: 'BASF SE',
    typeOfBusiness: 'Chemical Company',
    primaryApplicationType: 'Liquid Analysis',
    facilityType: 'Chemical Plant',
    installedAnalyzerCapacity: '620',
    numberOfAnalyzerSystems: '52',
    keyContactPerson: 'Klaus Müller',
    designationRole: 'Head of Process Analytics',
    emailAddress: 'k.muller@basf.com',
    phoneWhatsApp: '+49-621-555-0198',
    linkedInProfile: 'linkedin.com/in/klausmuller',
    websiteURL: 'basf.com'
  },
  {
    customerName: 'Reliance Industries',
    typeOfBusiness: 'Oil & Gas Operator',
    primaryApplicationType: 'Gas Analysis',
    facilityType: 'Refinery',
    installedAnalyzerCapacity: '380',
    numberOfAnalyzerSystems: '31',
    keyContactPerson: 'Rajesh Sharma',
    designationRole: 'GM - Instrumentation',
    emailAddress: 'rajesh.sharma@ril.com',
    phoneWhatsApp: '+91-22-555-0167',
    linkedInProfile: 'linkedin.com/in/rajeshsharma',
    websiteURL: 'ril.com'
  },
  {
    customerName: 'Duke Energy',
    typeOfBusiness: 'Power Plant Operator',
    primaryApplicationType: 'Emission Monitoring',
    facilityType: 'Power Plant',
    installedAnalyzerCapacity: '210',
    numberOfAnalyzerSystems: '18',
    keyContactPerson: 'Sarah Mitchell',
    designationRole: 'Director of Compliance',
    emailAddress: 's.mitchell@duke-energy.com',
    phoneWhatsApp: '+1-704-555-0223',
    linkedInProfile: 'linkedin.com/in/sarahmitchell',
    websiteURL: 'duke-energy.com'
  },
  {
    customerName: 'Veolia Water Technologies',
    typeOfBusiness: 'Water Utility',
    primaryApplicationType: 'Liquid Analysis',
    facilityType: 'Water Treatment Plant',
    installedAnalyzerCapacity: '340',
    numberOfAnalyzerSystems: '28',
    keyContactPerson: 'Pierre Dubois',
    designationRole: 'CTO',
    emailAddress: 'p.dubois@veolia.com',
    phoneWhatsApp: '+33-1-555-0189',
    linkedInProfile: 'linkedin.com/in/pierredubois',
    websiteURL: 'veolia.com'
  },
  {
    customerName: 'Dow Chemical',
    typeOfBusiness: 'Chemical Company',
    primaryApplicationType: 'Liquid Analysis',
    facilityType: 'Chemical Plant',
    installedAnalyzerCapacity: '510',
    numberOfAnalyzerSystems: '42',
    keyContactPerson: 'Michael Chen',
    designationRole: 'Sr. Manager Analytics',
    emailAddress: 'm.chen@dow.com',
    phoneWhatsApp: '+1-989-555-0134',
    linkedInProfile: 'linkedin.com/in/michaelchen',
    websiteURL: 'dow.com'
  },
  {
    customerName: 'Saudi Aramco',
    typeOfBusiness: 'Oil & Gas Operator',
    primaryApplicationType: 'Gas Analysis',
    facilityType: 'Refinery',
    installedAnalyzerCapacity: '890',
    numberOfAnalyzerSystems: '72',
    keyContactPerson: 'Ahmed Al-Rashid',
    designationRole: 'VP Process Engineering',
    emailAddress: 'a.alrashid@aramco.com',
    phoneWhatsApp: '+966-13-555-0211',
    linkedInProfile: 'linkedin.com/in/ahmedalrashid',
    websiteURL: 'aramco.com'
  },
  {
    customerName: 'Pfizer Inc.',
    typeOfBusiness: 'Pharmaceutical',
    primaryApplicationType: 'Liquid Analysis',
    facilityType: 'Pharmaceutical Plant',
    installedAnalyzerCapacity: '280',
    numberOfAnalyzerSystems: '24',
    keyContactPerson: 'Emily Watson',
    designationRole: 'Head of QC Analytics',
    emailAddress: 'e.watson@pfizer.com',
    phoneWhatsApp: '+1-212-555-0156',
    linkedInProfile: 'linkedin.com/in/emilywatson',
    websiteURL: 'pfizer.com'
  },
  {
    customerName: 'Shell Global',
    typeOfBusiness: 'Oil & Gas Operator',
    primaryApplicationType: 'Gas Analysis',
    facilityType: 'Refinery',
    installedAnalyzerCapacity: '560',
    numberOfAnalyzerSystems: '46',
    keyContactPerson: 'David van der Berg',
    designationRole: 'Director Instrumentation',
    emailAddress: 'd.vanderberg@shell.com',
    phoneWhatsApp: '+31-70-555-0178',
    linkedInProfile: 'linkedin.com/in/davidvanderberg',
    websiteURL: 'shell.com'
  },
  {
    customerName: 'Sinopec Corp.',
    typeOfBusiness: 'Chemical Company',
    primaryApplicationType: 'Gas Analysis',
    facilityType: 'Chemical Plant',
    installedAnalyzerCapacity: '720',
    numberOfAnalyzerSystems: '58',
    keyContactPerson: 'Wei Zhang',
    designationRole: 'Chief Engineer',
    emailAddress: 'w.zhang@sinopec.com',
    phoneWhatsApp: '+86-10-555-0145',
    linkedInProfile: 'linkedin.com/in/weizhang',
    websiteURL: 'sinopec.com'
  }
]

const proposition2Data: Proposition2Row[] = [
  ...proposition1Data.map((row, i) => ({
    ...row,
    annualProcurementBudget: ['$2.8M', '$3.5M', '$1.9M', '$1.2M', '$2.1M', '$3.0M', '$5.2M', '$1.8M', '$4.1M', '$3.8M'][i],
    preferredProcurementModel: ['OEM Direct', 'Distributor', 'System Integrator', 'OEM Direct', 'EPC Contractor', 'Distributor', 'OEM Direct', 'System Integrator', 'OEM Direct', 'EPC Contractor'][i],
    averageLeadTime: ['8', '12', '10', '6', '14', '10', '16', '8', '12', '14'][i],
    replacementCycle: ['7', '8', '6', '10', '7', '8', '5', '9', '7', '6'][i]
  })),
  {
    customerName: 'TotalEnergies',
    typeOfBusiness: 'Oil & Gas Operator',
    primaryApplicationType: 'Gas Analysis',
    facilityType: 'Refinery',
    installedAnalyzerCapacity: '410',
    numberOfAnalyzerSystems: '35',
    keyContactPerson: 'François Martin',
    designationRole: 'Head of Instrumentation',
    emailAddress: 'f.martin@totalenergies.com',
    phoneWhatsApp: '+33-1-555-0234',
    linkedInProfile: 'linkedin.com/in/francoismartin',
    websiteURL: 'totalenergies.com',
    annualProcurementBudget: '$2.6M',
    preferredProcurementModel: 'OEM Direct',
    averageLeadTime: '10',
    replacementCycle: '7'
  },
  {
    customerName: 'Bayer AG',
    typeOfBusiness: 'Pharmaceutical',
    primaryApplicationType: 'Liquid Analysis',
    facilityType: 'Pharmaceutical Plant',
    installedAnalyzerCapacity: '320',
    numberOfAnalyzerSystems: '27',
    keyContactPerson: 'Hans Weber',
    designationRole: 'Sr. Director QA',
    emailAddress: 'h.weber@bayer.com',
    phoneWhatsApp: '+49-214-555-0167',
    linkedInProfile: 'linkedin.com/in/hansweber',
    websiteURL: 'bayer.com',
    annualProcurementBudget: '$2.2M',
    preferredProcurementModel: 'System Integrator',
    averageLeadTime: '10',
    replacementCycle: '8'
  },
  {
    customerName: 'Tata Power',
    typeOfBusiness: 'Power Plant Operator',
    primaryApplicationType: 'Emission Monitoring',
    facilityType: 'Power Plant',
    installedAnalyzerCapacity: '180',
    numberOfAnalyzerSystems: '15',
    keyContactPerson: 'Anand Patel',
    designationRole: 'Chief Operating Officer',
    emailAddress: 'a.patel@tatapower.com',
    phoneWhatsApp: '+91-22-555-0289',
    linkedInProfile: 'linkedin.com/in/anandpatel',
    websiteURL: 'tatapower.com',
    annualProcurementBudget: '$1.1M',
    preferredProcurementModel: 'EPC Contractor',
    averageLeadTime: '12',
    replacementCycle: '9'
  }
]

const proposition3Data: Proposition3Row[] = proposition2Data.map((row, i) => ({
  ...row,
  levelOfAutomation: ['Online Continuous', 'Online Continuous', 'At-line', 'Online Continuous', 'Manual', 'Online Continuous', 'Online Continuous', 'At-line', 'Online Continuous', 'At-line', 'Online Continuous', 'At-line', 'Manual'][i],
  percentDCSIntegration: ['85%', '78%', '62%', '90%', '45%', '72%', '92%', '68%', '80%', '55%', '75%', '70%', '50%'][i],
  useOfAI: ['Yes', 'Yes', 'No', 'Yes', 'No', 'Yes', 'Yes', 'No', 'Yes', 'No', 'Yes', 'No', 'No'][i],
  predictiveMaintenanceAdoption: ['High', 'Medium', 'Low', 'High', 'Low', 'Medium', 'High', 'Medium', 'High', 'Low', 'Medium', 'Medium', 'Low'][i],
  remoteDiagnostics: ['Yes', 'Yes', 'No', 'Yes', 'No', 'Yes', 'Yes', 'Yes', 'Yes', 'No', 'Yes', 'No', 'No'][i],
  plannedCapacityExpansion: ['15%', '20%', '10%', '8%', '12%', '18%', '25%', '14%', '16%', '22%', '12%', '10%', '8%'][i],
  expectedNewPurchases: ['12', '18', '8', '5', '10', '15', '24', '8', '14', '20', '10', '6', '4'][i],
  newApplicationAreas: ['Hydrogen', 'Carbon Capture', 'Hydrogen', 'Carbon', 'None', 'Hydrogen', 'Hydrogen, Carbon', 'Biotech', 'Carbon Capture', 'Hydrogen', 'Carbon', 'Biotech', 'None'][i],
  newFacilityConstruction: ['Yes', 'Yes', 'No', 'No', 'Yes', 'Yes', 'Yes', 'No', 'Yes', 'Yes', 'No', 'No', 'No'][i],
  benchmarkingSummary: [
    'Top-tier operator, early adopter of digital analytics, strong procurement pipeline',
    'Leading chemical company with aggressive expansion plans in Asia-Pacific',
    'Growing operator with increasing investment in automation and analytics',
    'Compliance-focused utility with steady replacement cycle needs',
    'Large water infrastructure player expanding into smart monitoring',
    'Major chemical player with strong digitalization roadmap',
    'Largest global operator, massive procurement scale, premium technology buyer',
    'Pharma leader with strict QC requirements, potential for spectroscopic upgrades',
    'Global energy major with standardized instrumentation platform',
    'Rapidly growing operator with large-scale modernization underway',
    'European energy major transitioning to green energy monitoring',
    'Pharma company investing in continuous manufacturing analytics',
    'Emerging power player with growing compliance monitoring needs'
  ][i],
  additionalComments: [
    'Currently evaluating AI-based predictive maintenance solutions from ABB and Siemens',
    'Planning new specialty chemicals plant in China with full analyzer integration',
    'Recently completed Jamnagar expansion; next phase includes advanced gas chromatography',
    'Regulatory pressure driving CEMS upgrade cycle across 12 power stations',
    'Smart water initiative launching Q3 2026 with focus on real-time quality monitoring',
    'Exploring partnership with Endress+Hauser for next-gen liquid analyzers',
    'Mega-project pipeline includes 3 new refineries with >200 analyzer systems each',
    'FDA compliance driving adoption of PAT (Process Analytical Technology)',
    'Global standardization program consolidating analyzer vendors from 8 to 3',
    'Government partnership for environmental monitoring across industrial zones',
    'Transitioning analyzer fleet for hydrogen-ready monitoring capabilities',
    'Investing in continuous glucose monitoring technology for API production',
    'Exploring CEMS solutions for upcoming emission regulations'
  ][i]
}))

// ============================================================
// COMPONENT
// ============================================================

export default function CustomerIntelligencePropositions({
  title = 'Customer Intelligence',
  height = 600
}: {
  title?: string
  height?: number
}) {
  const [activeProposition, setActiveProposition] = useState<1 | 2 | 3>(1)

  const headerCellClass = 'px-3 py-2 text-xs font-semibold text-white text-left whitespace-nowrap'
  const subHeaderCellClass = 'px-3 py-2 text-[10px] font-medium text-white text-left border border-blue-300/40'
  const dataCellClass = 'px-3 py-2 text-xs text-gray-700 border border-gray-200 whitespace-nowrap'

  const renderProposition1 = () => (
    <div className="overflow-x-auto" style={{ maxHeight: height }}>
      <table className="min-w-full border-collapse">
        <thead className="sticky top-0 z-10">
          {/* Parent header row */}
          <tr>
            <th colSpan={6} className="px-3 py-2 text-sm font-bold text-center bg-[#F5D5C8] text-gray-800 border border-gray-200">
              Customer Information
            </th>
            <th colSpan={6} className="px-3 py-2 text-sm font-bold text-center bg-[#B8D4E3] text-gray-800 border border-gray-200">
              Contact Details
            </th>
          </tr>
          {/* Sub-header row */}
          <tr className="bg-[#4472C4]">
            <th className={subHeaderCellClass} style={{ minWidth: 140 }}>Customer Name/Company Name</th>
            <th className={subHeaderCellClass} style={{ minWidth: 160 }}>Type of Business (Oil & Gas Operator, Chemical Company, Power Plant Operator,)</th>
            <th className={subHeaderCellClass} style={{ minWidth: 150 }}>Primary Application Type (Gas Analysis, Liquid Analysis, Emission Monitoring,)</th>
            <th className={subHeaderCellClass} style={{ minWidth: 140 }}>Facility Type (Refinery, Chemical Plant, Power Plant, Water Treatment Plant,)</th>
            <th className={subHeaderCellClass} style={{ minWidth: 120 }}>Installed Analyzer Capacity (No. of Units)</th>
            <th className={subHeaderCellClass} style={{ minWidth: 120 }}>Number of Analyzer Systems/Lines</th>
            <th className={subHeaderCellClass} style={{ minWidth: 130 }}>Key Contact Person</th>
            <th className={subHeaderCellClass} style={{ minWidth: 120 }}>Designation/Role</th>
            <th className={subHeaderCellClass} style={{ minWidth: 160 }}>Email Address</th>
            <th className={subHeaderCellClass} style={{ minWidth: 140 }}>Phone/WhatsApp Number</th>
            <th className={subHeaderCellClass} style={{ minWidth: 150 }}>LinkedIn Profile</th>
            <th className={subHeaderCellClass} style={{ minWidth: 130 }}>Website URL</th>
          </tr>
        </thead>
        <tbody>
          {proposition1Data.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className={`${dataCellClass} font-medium text-gray-900`}>{row.customerName}</td>
              <td className={dataCellClass}>{row.typeOfBusiness}</td>
              <td className={dataCellClass}>{row.primaryApplicationType}</td>
              <td className={dataCellClass}>{row.facilityType}</td>
              <td className={dataCellClass}>{row.installedAnalyzerCapacity}</td>
              <td className={dataCellClass}>{row.numberOfAnalyzerSystems}</td>
              <td className={dataCellClass}>{row.keyContactPerson}</td>
              <td className={dataCellClass}>{row.designationRole}</td>
              <td className={dataCellClass}>{row.emailAddress}</td>
              <td className={dataCellClass}>{row.phoneWhatsApp}</td>
              <td className={dataCellClass}>{row.linkedInProfile}</td>
              <td className={dataCellClass}>{row.websiteURL}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  const renderProposition2 = () => (
    <div className="overflow-x-auto" style={{ maxHeight: height }}>
      <table className="min-w-full border-collapse">
        <thead className="sticky top-0 z-10">
          {/* Parent header row */}
          <tr>
            <th colSpan={6} className="px-3 py-2 text-sm font-bold text-center bg-[#F5D5C8] text-gray-800 border border-gray-200">
              Customer Information
            </th>
            <th colSpan={6} className="px-3 py-2 text-sm font-bold text-center bg-[#B8D4E3] text-gray-800 border border-gray-200">
              Contact Details
            </th>
            <th colSpan={4} className="px-3 py-2 text-sm font-bold text-center bg-[#C5E8D5] text-gray-800 border border-gray-200">
              Procurement & Purchase Metrics
            </th>
          </tr>
          {/* Sub-header row */}
          <tr className="bg-[#4472C4]">
            <th className={subHeaderCellClass} style={{ minWidth: 140 }}>Customer Name/Company Name</th>
            <th className={subHeaderCellClass} style={{ minWidth: 160 }}>Type of Business (Oil & Gas Operator, Chemical Company, Power Plant Operator, Water Utility,)</th>
            <th className={subHeaderCellClass} style={{ minWidth: 150 }}>Primary Application Type (Gas Analysis, Liquid Analysis, Emission Monitoring,)</th>
            <th className={subHeaderCellClass} style={{ minWidth: 140 }}>Facility Type (Refinery, Chemical Plant, Power Plant, Water Treatment Plant,)</th>
            <th className={subHeaderCellClass} style={{ minWidth: 120 }}>Installed Analyzer Capacity (No. of Units)</th>
            <th className={subHeaderCellClass} style={{ minWidth: 120 }}>Number of Analyzer Systems/Lines</th>
            <th className={subHeaderCellClass} style={{ minWidth: 130 }}>Key Contact Person</th>
            <th className={subHeaderCellClass} style={{ minWidth: 120 }}>Designation/Role</th>
            <th className={subHeaderCellClass} style={{ minWidth: 160 }}>Email Address</th>
            <th className={subHeaderCellClass} style={{ minWidth: 140 }}>Phone/WhatsApp Number</th>
            <th className={subHeaderCellClass} style={{ minWidth: 150 }}>LinkedIn Profile</th>
            <th className={subHeaderCellClass} style={{ minWidth: 130 }}>Website URL</th>
            <th className={subHeaderCellClass} style={{ minWidth: 140 }}>Annual Process Analyzer Procurement Budget (US$)</th>
            <th className={subHeaderCellClass} style={{ minWidth: 160 }}>Preferred Procurement Model (OEM Direct, Distributor, System Integrator, EPC Contractor)</th>
            <th className={subHeaderCellClass} style={{ minWidth: 130 }}>Average Procurement Lead Time (Weeks)</th>
            <th className={subHeaderCellClass} style={{ minWidth: 130 }}>Replacement Cycle of Equipment (Years)</th>
          </tr>
        </thead>
        <tbody>
          {proposition2Data.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className={`${dataCellClass} font-medium text-gray-900`}>{row.customerName}</td>
              <td className={dataCellClass}>{row.typeOfBusiness}</td>
              <td className={dataCellClass}>{row.primaryApplicationType}</td>
              <td className={dataCellClass}>{row.facilityType}</td>
              <td className={dataCellClass}>{row.installedAnalyzerCapacity}</td>
              <td className={dataCellClass}>{row.numberOfAnalyzerSystems}</td>
              <td className={dataCellClass}>{row.keyContactPerson}</td>
              <td className={dataCellClass}>{row.designationRole}</td>
              <td className={dataCellClass}>{row.emailAddress}</td>
              <td className={dataCellClass}>{row.phoneWhatsApp}</td>
              <td className={dataCellClass}>{row.linkedInProfile}</td>
              <td className={dataCellClass}>{row.websiteURL}</td>
              <td className={dataCellClass}>{row.annualProcurementBudget}</td>
              <td className={dataCellClass}>{row.preferredProcurementModel}</td>
              <td className={dataCellClass}>{row.averageLeadTime}</td>
              <td className={dataCellClass}>{row.replacementCycle}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  const renderProposition3 = () => (
    <div className="overflow-x-auto" style={{ maxHeight: height }}>
      <table className="min-w-full border-collapse">
        <thead className="sticky top-0 z-10">
          {/* Parent header row */}
          <tr>
            <th colSpan={6} className="px-3 py-2 text-sm font-bold text-center bg-[#F5D5C8] text-gray-800 border border-gray-200">
              Customer Information
            </th>
            <th colSpan={6} className="px-3 py-2 text-sm font-bold text-center bg-[#B8D4E3] text-gray-800 border border-gray-200">
              Contact Details
            </th>
            <th colSpan={4} className="px-3 py-2 text-sm font-bold text-center bg-[#C5E8D5] text-gray-800 border border-gray-200">
              Procurement & Purchase Metrics
            </th>
            <th colSpan={5} className="px-3 py-2 text-sm font-bold text-center bg-[#D5C8F5] text-gray-800 border border-gray-200">
              Digital & Technology Adoption Metrics
            </th>
            <th colSpan={4} className="px-3 py-2 text-sm font-bold text-center bg-[#C8F5D5] text-gray-800 border border-gray-200">
              Future Demand & Expansion Metrics
            </th>
            <th colSpan={2} className="px-3 py-2 text-sm font-bold text-center bg-[#F5F0C8] text-gray-800 border border-gray-200">
              CMI Insights
            </th>
          </tr>
          {/* Sub-header row */}
          <tr className="bg-[#4472C4]">
            {/* Customer Information */}
            <th className={subHeaderCellClass} style={{ minWidth: 140 }}>Customer Name/Company Name</th>
            <th className={subHeaderCellClass} style={{ minWidth: 160 }}>Type of Business (Oil & Gas Operator, Chemical Company, Power Plant Operator, Water Utility,)</th>
            <th className={subHeaderCellClass} style={{ minWidth: 150 }}>Primary Application Type (Gas Analysis, Liquid Analysis, Emission Monitoring,)</th>
            <th className={subHeaderCellClass} style={{ minWidth: 140 }}>Facility Type (Refinery, Chemical Plant, Power Plant, Water Treatment Plant,)</th>
            <th className={subHeaderCellClass} style={{ minWidth: 120 }}>Installed Analyzer Capacity (No. of Units)</th>
            <th className={subHeaderCellClass} style={{ minWidth: 120 }}>Number of Analyzer Systems/Lines</th>
            {/* Contact Details */}
            <th className={subHeaderCellClass} style={{ minWidth: 130 }}>Key Contact Person</th>
            <th className={subHeaderCellClass} style={{ minWidth: 120 }}>Designation/Role</th>
            <th className={subHeaderCellClass} style={{ minWidth: 160 }}>Email Address</th>
            <th className={subHeaderCellClass} style={{ minWidth: 140 }}>Phone/WhatsApp Number</th>
            <th className={subHeaderCellClass} style={{ minWidth: 150 }}>LinkedIn Profile</th>
            <th className={subHeaderCellClass} style={{ minWidth: 130 }}>Website URL</th>
            {/* Procurement */}
            <th className={subHeaderCellClass} style={{ minWidth: 140 }}>Annual Process Analyzer Procurement Budget (US$)</th>
            <th className={subHeaderCellClass} style={{ minWidth: 160 }}>Preferred Procurement Model (OEM Direct, Distributor, System Integrator, EPC Contractor)</th>
            <th className={subHeaderCellClass} style={{ minWidth: 130 }}>Average Procurement Lead Time (Weeks)</th>
            <th className={subHeaderCellClass} style={{ minWidth: 130 }}>Replacement Cycle of Equipment (Years)</th>
            {/* Digital & Technology */}
            <th className={subHeaderCellClass} style={{ minWidth: 150 }}>Level of Automation (Manual, At-line, Online Continuous Monitoring)</th>
            <th className={subHeaderCellClass} style={{ minWidth: 130 }}>Percentage of Systems with DCS/SCADA Integration</th>
            <th className={subHeaderCellClass} style={{ minWidth: 120 }}>Use of AI or Advanced Analytics (Yes or No)</th>
            <th className={subHeaderCellClass} style={{ minWidth: 140 }}>Predictive Maintenance Tools Adoption (Low, Medium, High)</th>
            <th className={subHeaderCellClass} style={{ minWidth: 130 }}>Remote Monitoring and Diagnostics Capability (Yes or No)</th>
            {/* Future Demand */}
            <th className={subHeaderCellClass} style={{ minWidth: 140 }}>Planned Capacity Expansion in Next 3 Years (%)</th>
            <th className={subHeaderCellClass} style={{ minWidth: 140 }}>Expected New Analyzer Purchases in Next 3 Years</th>
            <th className={subHeaderCellClass} style={{ minWidth: 140 }}>New Application Areas Planned (Hydrogen, Carbon)</th>
            <th className={subHeaderCellClass} style={{ minWidth: 130 }}>New Facility Construction Planned (Yes or No)</th>
            {/* CMI Insights */}
            <th className={subHeaderCellClass} style={{ minWidth: 250 }}>Customer Benchmarking Summary (Potential Customers)</th>
            <th className={subHeaderCellClass} style={{ minWidth: 250 }}>Additional Comments/Notes By CMI Team</th>
          </tr>
        </thead>
        <tbody>
          {proposition3Data.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              {/* Customer Information */}
              <td className={`${dataCellClass} font-medium text-gray-900`}>{row.customerName}</td>
              <td className={dataCellClass}>{row.typeOfBusiness}</td>
              <td className={dataCellClass}>{row.primaryApplicationType}</td>
              <td className={dataCellClass}>{row.facilityType}</td>
              <td className={dataCellClass}>{row.installedAnalyzerCapacity}</td>
              <td className={dataCellClass}>{row.numberOfAnalyzerSystems}</td>
              {/* Contact Details */}
              <td className={dataCellClass}>{row.keyContactPerson}</td>
              <td className={dataCellClass}>{row.designationRole}</td>
              <td className={dataCellClass}>{row.emailAddress}</td>
              <td className={dataCellClass}>{row.phoneWhatsApp}</td>
              <td className={dataCellClass}>{row.linkedInProfile}</td>
              <td className={dataCellClass}>{row.websiteURL}</td>
              {/* Procurement */}
              <td className={dataCellClass}>{row.annualProcurementBudget}</td>
              <td className={dataCellClass}>{row.preferredProcurementModel}</td>
              <td className={dataCellClass}>{row.averageLeadTime}</td>
              <td className={dataCellClass}>{row.replacementCycle}</td>
              {/* Digital & Technology */}
              <td className={dataCellClass}>{row.levelOfAutomation}</td>
              <td className={dataCellClass}>{row.percentDCSIntegration}</td>
              <td className={dataCellClass}>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${row.useOfAI === 'Yes' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                  {row.useOfAI}
                </span>
              </td>
              <td className={dataCellClass}>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                  row.predictiveMaintenanceAdoption === 'High' ? 'bg-green-100 text-green-700' :
                  row.predictiveMaintenanceAdoption === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-600'
                }`}>
                  {row.predictiveMaintenanceAdoption}
                </span>
              </td>
              <td className={dataCellClass}>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${row.remoteDiagnostics === 'Yes' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                  {row.remoteDiagnostics}
                </span>
              </td>
              {/* Future Demand */}
              <td className={dataCellClass}>{row.plannedCapacityExpansion}</td>
              <td className={dataCellClass}>{row.expectedNewPurchases}</td>
              <td className={dataCellClass}>{row.newApplicationAreas}</td>
              <td className={dataCellClass}>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${row.newFacilityConstruction === 'Yes' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>
                  {row.newFacilityConstruction}
                </span>
              </td>
              {/* CMI Insights */}
              <td className={`${dataCellClass} !whitespace-normal`} style={{ minWidth: 250, maxWidth: 300 }}>{row.benchmarkingSummary}</td>
              <td className={`${dataCellClass} !whitespace-normal`} style={{ minWidth: 250, maxWidth: 300 }}>{row.additionalComments}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      </div>

      {/* Proposition Tabs */}
      <div className="flex gap-2 mb-4">
        {([1, 2, 3] as const).map((num) => (
          <button
            key={num}
            onClick={() => setActiveProposition(num)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
              activeProposition === num
                ? 'bg-[#4472C4] text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Proposition {num}
          </button>
        ))}
      </div>

      {/* Proposition Description */}
      <div className="mb-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-xs text-gray-600">
          {activeProposition === 1 && 'Customer Information & Contact Details — Basic customer profiling with business type, application type, facility details, and key contact information.'}
          {activeProposition === 2 && 'Customer Information, Contact Details & Procurement Metrics — Extended profiling with annual procurement budget, preferred procurement model, lead time, and replacement cycle data.'}
          {activeProposition === 3 && 'Full Customer Intelligence — Comprehensive profiling including digital & technology adoption metrics, future demand & expansion plans, and CMI team insights.'}
        </p>
      </div>

      {/* Table Content */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        {activeProposition === 1 && renderProposition1()}
        {activeProposition === 2 && renderProposition2()}
        {activeProposition === 3 && renderProposition3()}
      </div>

      {/* Row Count */}
      <div className="mt-2 text-xs text-gray-500 text-right">
        {activeProposition === 1 && `${proposition1Data.length} customers`}
        {activeProposition === 2 && `${proposition2Data.length} customers`}
        {activeProposition === 3 && `${proposition3Data.length} customers`}
      </div>
    </div>
  )
}
