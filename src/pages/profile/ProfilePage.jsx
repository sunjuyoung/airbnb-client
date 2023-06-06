import React, { useCallback, useEffect, useMemo, useState } from "react";
import Avatar from "../../components/Avatar";
import { BiCheck } from "react-icons/bi";
import { BiImageAdd } from "react-icons/bi";
import { useSelector } from "react-redux";
import ProfileImage from "../../components/inputs/ProfileImage";
import newRequest, {
  getProfileImage,
  updateProfileImage,
} from "../../utils/newRequest";

const ProfilePage = () => {
  const [avatarImage, setAvatarImage] = useState(null);
  const user = useSelector((state) => state?.user);
  const token = useSelector((state) => state?.token);
  const [image, setImage] = useState(null);

  const [profileEditView, setProfileEditView] = useState(false);

  useEffect(() => {
    handleProfileImage();
  }, []);

  const handleProfile = async (e) => {
    e.preventDefault();
    if (image === null) {
      setProfileEditView((prev) => !prev);
      return;
    }
    await updateProfileImage(user.id, token, image);
    setProfileEditView((prev) => !prev);
  };

  const handleProfileView = () => {
    setProfileEditView((prev) => !prev);
  };

  const handleProfileImage = useCallback(async () => {
    const res = await getProfileImage(user.id, token);

    if (res === "") {
      setAvatarImage("/images/avatar2.png");
    } else {
      setAvatarImage(res);
    }
  }, [user, avatarImage]);

  return (
    <div className="flex flex-row row-span-2 pt-10 mx-12 mt-10">
      <div className="flex flex-col w-3/8 gap-7 lg:w-3/8">
        {/* 이미지 */}

        <ProfileImage
          username={user.name}
          imageButton={profileEditView}
          onChange={(value) => setImage(value)}
          img={avatarImage}
        />

        <div className="pr-6">
          <div className="flex flex-col gap-3 my-4">
            <p className="text-2xl font-bold">{user.name} 님의 인증 정보</p>
            <div className="flex gap-3">
              <BiCheck size={28} />
              <span>이메일 주소</span>
            </div>
          </div>
          <hr />
          <div className="flex flex-col gap-3 my-4">
            <p className="text-xl font-bold">본인 인증</p>
            <div>
              <span className="text-sm">
                본인 인증 배지를 통해 본인 인증을 마쳤다는 사실을 다른 <br />
                사용자에게 보여줄 수 있습니다.
              </span>
            </div>
          </div>
          <div>
            <button className="font-bold rounded-lg hover:bg-gray-200 border-black py-3 px-3 border-[1px] bg-white">
              메일 인증
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-3/6 gap-4 lg:w-3/6">
        {!profileEditView ? (
          <div className="my-auto md:block">
            <div className="mb-4 text-xl font-bold">프로필을 작성해 보세요</div>
            <p className="text-sm">
              프로필은 에어비앤비를 통한 예약 과정에서 중요한 역할을 합니다.
              다른 호스트와 게스트에게 나를 알릴 수 있도록 프로필을 작성하세요.
            </p>
            <div className="mt-4 ml-2">
              <button
                onClick={handleProfileView}
                className="p-3 font-bold text-white bg-red-500 rounded-lg"
              >
                프로필 작성하기
              </button>
            </div>
          </div>
        ) : (
          <div className="">
            <div className="mb-4 text-xl font-bold">프로필</div>
            <p className="text-sm">
              프로필은 에어비앤비 전반에 걸쳐 다른 게스트와 호스트에게 나를
              알리는 기본적인 정보입니다
            </p>
            <div className="mt-4 ml-2">
              <button
                onClick={handleProfile}
                className="p-3 font-bold text-white bg-red-500 rounded-lg"
              >
                완료
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
