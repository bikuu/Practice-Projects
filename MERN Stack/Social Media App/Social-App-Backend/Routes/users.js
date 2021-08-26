const router = require("express").Router();
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");

const User = require("../models/User");

router.put("/:id", auth, async (req, res) => {
  if (req.body.userId === req.params.id || req.user.isAdmin) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
      try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
        });
        res.status(200).send({ message: "Updated successfully", data: user });
      } catch (err) {
        console.log(err);
      }
    }
  } else {
    console.log("U r not authorize");
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: "Deleted successfully", data: user });
  } catch (err) {
    console.log(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const userId = req.query.userId;
    const username = req.query.username;
    const user = userId
      ? await User.findById(userId).select("-password -updatedAt -isAdmin")
      : await User.findOne({ username: username }).select(
          "-password -updatedAt -isAdmin"
        );
    res.status(200).send(user);
  } catch (err) {
    console.log(err);
  }
});

// get Friends

// router.get("/friends/:userId", async (req, res) => {
//   try {
//     const user = await User.findById(req.params.userId);
//     const friends = await Promise.all(
//       user.followings.map((friendId) => {
//         return User.findById(friendId);
//       })
//     );
//     let friendList = [];
//     friends.map((friend) => {
//       const { _id, username, profilePicture } = friend;
//       friendList.push({ _id, username, profilePicture });
//     });
//     res.status(200).send(friendList);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });
router.get("/friends/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.followings.map((friendId) => {
        return User.findById(friendId).select("_id username profilePicture");
      })
    );
    res.status(200).send(friends);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Follow a User
router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const currentUser = await User.findById(req.body.userId);
      const user = await User.findById(req.params.id);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({
          $push: { followings: req.params.id },
        });
        res
          .status(200)
          .send({ message: "Followed successfully", data: currentUser });
      } else {
        ("Already followed");
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    console.log("U can not follow urself");
  }
});
//UnFollow a User
router.put("/:id/unfollow", auth, async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const currentUser = await User.findById(req.body.userId);
      const user = await User.findById(req.params.id);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({
          $pull: { followings: req.params.id },
        });
        res
          .status(200)
          .send({ message: "UnFollowed successfully", data: currentUser });
      } else {
        ("Already Unfollowed");
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    console.log("U can not unfollow urself");
  }
});

module.exports = router;
