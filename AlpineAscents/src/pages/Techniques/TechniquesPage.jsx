import KnowledgeSection from '../../components/KnowledgeSection'
import content from '../../data/techniques.json'

export default function TechniquesPage() {
  return <KnowledgeSection {...content} />
}
