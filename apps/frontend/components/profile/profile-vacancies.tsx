import Vacancy from '../vacancy/vacancy'

export default function ProfileVacancies() {
	return (
		<div className={'w-[68rem] pb-[5.25rem] flex flex-col transition-all'}>
			<Vacancy inProfile />
			<Vacancy inProfile />
		</div>
	)
}
