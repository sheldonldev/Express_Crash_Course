const express = require('express');
const router = express.Router();
const members = require('../../Members');
const uuid = require('uuid');

// Get all member
router.get('/', (req, res) => {
    res.json(members);
});

// Get single member
router.get('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id))

    if (found) {
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({ msg: `Member with id ${req.params.id} not found` });
    }
});

// Create Member
router.post('/', (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }

    // const {id, name, email, status} = req.body

    if ( !newMember.name || !newMember.email ) {
        return res.status(400).json({ msg: 'Empty name or email.' });
    }

    members.push(newMember)
    res.json(members)
})

// Update member
router.put('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id))

    if (found) {
        const upMember = req.body;
        members.forEach(member => {
            if (member.id === parseInt(req.params.id)) {
                member.name = !upMember.name ? member.name : upMember.name;
                member.email = !upMember.email ? member.email : upMember.email;

                res.json({ msg: 'Member updated', member })
            }
        });
    } else {
        res.status(400).json({ msg: `Member with id ${req.params.id} not found` });
    }
});

// Delete single member
router.delete('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id))

    if (found) {
        res.json({
            msg: "Member Deleted",
            members: members.filter(member => member.id !== parseInt(req.params.id))
        });
    } else {
        res.status(400).json({ msg: `Member with id ${req.params.id} not found` });
    }
});

module.exports = router