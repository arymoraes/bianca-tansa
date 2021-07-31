import { FiEdit } from 'react-icons/fi'
import { PageTitle } from './PageTitle'

interface Props {}

export const UserInfo = (props: Props) => {
  return (
    <div className="user-info">
      <PageTitle title={'Profile'} />
      <div className="profile-picture">
        <img
          src="https://media-exp1.licdn.com/dms/image/C5103AQHZTl_kObKYpQ/profile-displayphoto-shrink_200_200/0/1516954745706?e=1632355200&v=beta&t=c9I_J23KG6YLWwVZqwZq5zIutvrmlPxokT6fUPqhsGU"
          alt="User Profile Pic"
          className="profile-picture--img"
        />
      </div>
      <div className="user-info__box--title">
        <h1 className="user-info__name">Bianca Procopio</h1>
        <FiEdit className="user-info__icon" />
      </div>
      <div className="user-info__box">
        <p>E-mail: </p>
        <span>bianca_procopio@hotmail.com</span>
      </div>
      <div className="user-info__box">
        <p>Username: </p>
        <span>biancahpp</span>
      </div>
      <div className="user-info__box">
        <p>Password: </p>
        <span>password</span>
      </div>
    </div>
  )
}
