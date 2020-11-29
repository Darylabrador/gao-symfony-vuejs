<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserFixture extends Fixture
{
    public function load(ObjectManager $manager)
    {
        // $user = new User();
        // $user->setEmail('admin@gmail.com');
        // $user->setPassword();
        // $manager->persist($user);
        $manager->flush();
    }
}
